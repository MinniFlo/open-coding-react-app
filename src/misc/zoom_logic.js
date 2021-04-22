import {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {offsetChanged, scaleChanged} from "../features/navigationSlice";
import {calcMaxOffset, useDimension} from "./functionatitys";

const MIN_SCALE = 0.1;
const MAX_SCALE = 2;


export default function useScale(canvasRef) {
  const [, setLastScale] = useState(0.7)
  const [scale, setScale] = useState(0.7);
  const dispatch = useDispatch();
  const dimRef = useDimension(canvasRef);
  const offset = useSelector(state => state.navigation.offset)

  const updateScale = useCallback(({direction, interval}) => {
    const currentScale = scale;
    let newScale;

    if (direction === 'up' && currentScale + interval < MAX_SCALE) {
      newScale = currentScale + interval
    } else if (direction === 'up') {
      newScale = MAX_SCALE
    } else if (direction === 'down' && currentScale - interval > MIN_SCALE) {
      newScale = currentScale - interval
    } else if (direction === 'down') {
      newScale = MIN_SCALE
    } else {
      newScale = currentScale
    }
    setLastScale(currentScale)
    setScale(newScale)
  }, [scale])

  const handler = useCallback(e => {
     if (e.target.id === "canvas" || e.target.id === "note") {

      updateScale({
        direction: e.deltaY < 0 ? 'up' : 'down',
        interval: 0.05,
      })
     }
  }, [updateScale]);

  useEffect(() => {
    window.addEventListener("wheel", handler);
    return () => {
      window.removeEventListener("wheel", handler);
    }
  }, [handler])

  useEffect(() => {
    dispatch(scaleChanged({scale: scale}))
    // const oldFrame = {x: 0.1*dim.x*lastScale, y: 0.1*dim.y*lastScale}
    // const Frame = {x: 0.1*dim.x*scale, y: 0.1*dim.y*scale}
    // const delta = {x: (oldFrame.x - Frame.x)*2, y: (oldFrame.y - Frame.y)*2}
    // console.log(delta)
    // const adjOffset = {x: offset.x - delta.x, y: offset.y - delta.y}
    // const maxOffset = calcMaxOffset(scale, dim, adjOffset)
    // dispatch(offsetChanged({offset: maxOffset}));
    // if (dim.x !== 0 && dim.y !== 0 && dim) {
    //   const relativePos = {
    //     x: (offset.x + 0.05*dim.x/lastScale)/dim.x*lastScale,
    //     y: (offset.y + 0.05*dim.y/lastScale)/dim.y*lastScale
    //   }
    //   const newOffset = {
    //     x: relativePos.x*dim.x*scale,// - 0.05*dim.x/scale,
    //     y: relativePos.y*dim.y*scale// - 0.05*dim.y/scale,
    //   }
    //   const adjustedOffset = calcMaxOffset(scale, dim, newOffset);
    //   dispatch(offsetChanged({offset: adjustedOffset}));
    // }
    const adjustedOffset = calcMaxOffset(scale, dimRef.current, offset);
    dispatch(offsetChanged({offset: adjustedOffset}));
    // eslint-disable-next-line react-hooks/exhaustive-deps,no-sparse-arrays
  }, [dispatch, scale])
}

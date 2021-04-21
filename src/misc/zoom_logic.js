import {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {offsetChanged, scaleChanged} from "../features/navigationSlice";
import {calcMaxOffset, useDimension} from "./functionatitys";

const MIN_SCALE = 0.1;
const MAX_SCALE = 2;


export default function useScale(canvasRef) {
  const [lastScale, setLastScale] = useState(0.7)
  const [scale, setScale] = useState(0.7);
  const dispatch = useDispatch();
  const dim = useDimension(canvasRef);
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
    const oldFrame = {x: dim.x*lastScale, y: dim.y*lastScale}
    const Frame = {x: dim.x*scale, y: dim.y*scale}
    const delta = {x: (oldFrame.x - Frame.x)/2, y: (oldFrame.y - Frame.y)/2}
    const adjOffset = {x: offset.x - delta.x, y: offset.y - delta.y}
    const maxOffset = calcMaxOffset(scale, dim, adjOffset)

    dispatch(offsetChanged({offset: maxOffset}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dim.x, dim.y, dispatch, scale])
}

import {useState, useEffect, useCallback} from "react";
import {useDispatch} from "react-redux";
import {scaleChanged} from "../features/navigationSlice";

const MIN_SCALE = 0.2;
const MAX_SCALE = 2;


export default function useScale() {
  const [scale, setScale] = useState(1);
  const dispatch = useDispatch();

  const updateScale = useCallback(({direction, interval}) => {
    setScale(currentScale => {
      let scale;

      if (direction === 'up' && currentScale + interval < MAX_SCALE) {
        scale = currentScale + interval
      } else if (direction === 'up') {
        scale = MAX_SCALE
      } else if (direction === 'down' && currentScale - interval > MIN_SCALE) {
        scale = currentScale - interval
      } else if (direction === 'down') {
        scale = MIN_SCALE
      } else {
        scale = currentScale
      }
      return scale;
    })
  },[])

  const handler = useCallback(e => {
    updateScale({
      direction: e.deltaY < 0 ? 'up' : 'down',
      interval: 0.1,
    })
  }, [updateScale]);

  useEffect(() => {
    window.addEventListener("wheel", handler);
    return () => {
      window.removeEventListener("wheel", handler);
    }
  }, [handler])

  useEffect(() => {
    dispatch(scaleChanged({scale: scale}))
  }, [dispatch, scale])

  return scale;
}

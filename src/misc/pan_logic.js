import {useCallback, useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDimension} from "./hooks";
import {offsetChanged} from "../features/navigationSlice";


const ORIGIN = Object.freeze({x: 0, y: 0});

export default function usePan(canvasRef) {
  const [panState, setPanState] = useState(ORIGIN);
  const lastPointRef = useRef(ORIGIN);
  const scale = useSelector(state => state.navigation.scale);
  const dispatch = useDispatch();

  const [, maxOffset] = useDimension(canvasRef);

  const pan = useCallback((e) => {
    const lastPoint = lastPointRef.current;
    const point = {x: e.pageX, y: e.pageY};
    lastPointRef.current = point;

    setPanState(panState => {
      const delta = {
        x: lastPoint.x - point.x,
        y: lastPoint.y - point.y
      }
      let panX = panState.x + delta.x
      let panY = panState.y + delta.y

      if (panX < 0) {
        panX = 0;
      }
      else if (panX/scale > maxOffset.x) {
        panX = maxOffset.x*scale;
      }

      if (panY < 0) {
        panY = 0;
      }
      else if (panY/scale > maxOffset.y) {
        panY = maxOffset.y*scale;
      }

      return {
        x: panX,
        y: panY,
      }
    })

  }, [maxOffset.x, maxOffset.y, scale]);

  const endPan = useCallback(() => {
    document.removeEventListener('mousemove', pan);
    document.removeEventListener('mouseup', endPan);
  }, [pan])

  const startPan = useCallback((e) => {
    document.addEventListener('mousemove', pan);
    document.addEventListener('mouseup', endPan);
    lastPointRef.current = {x:e.pageX, y:e.pageY};
  }, [endPan, pan])

  useEffect(() => {
    dispatch(offsetChanged({offset: panState}))
  }, [dispatch, panState])

  return startPan;
}


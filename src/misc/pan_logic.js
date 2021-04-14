import {useCallback, useState, useRef, useEffect} from "react";
import {useSelector} from "react-redux";


const ORIGIN = Object.freeze({x: 0, y: 0});

export default function usePan(canvasRef) {
  const [panState, setPanState] = useState(ORIGIN);
  const lastPointRef = useRef(ORIGIN);
  const scale = useSelector(state => state.navigation.scale);

  const canvasDim = useDimension(canvasRef);

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

      const maxOffsetX = canvasDim.x - canvasDim.x*0.1/scale;
      const maxOffsetY = canvasDim.y - canvasDim.y*0.1/scale;

      if (panX < 0) {
        panX = 0;
      }
      else if (panX/scale > maxOffsetX) {
        panX = maxOffsetX*scale;
      }

      if (panY < 0) {
        panY = 0;
      }
      else if (panY/scale > maxOffsetY) {
        panY = maxOffsetY*scale;
      }

      return {
        x: panX,
        y: panY,
      }
    })

  }, [canvasDim.x, canvasDim.y, scale]);

  const endPan = useCallback(() => {
    document.removeEventListener('mousemove', pan);
    document.removeEventListener('mouseup', endPan);
  }, [pan])

  const startPan = useCallback((e) => {
    document.addEventListener('mousemove', pan);
    document.addEventListener('mouseup', endPan);
    lastPointRef.current = {x:e.pageX, y:e.pageY};
  }, [endPan, pan])

  return [panState, startPan];
}

function useDimension(ref) {
  const [dim, setDim] = useState({x:0, y:0});

  useEffect(() => {
    if (ref.current !== null){
      setDim({
        x: ref.current.clientWidth,
        y: ref.current.clientHeight,
      })
    }
  }, [ref, setDim])

  return dim;
}
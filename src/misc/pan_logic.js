import {useCallback, useState, useRef} from "react";

const ORIGIN = Object.freeze({x: 0, y: 0});

export default function usePan() {
  const [panState, setPanState] = useState(ORIGIN);
  const lastPointRef = useRef(ORIGIN);

  const pan = useCallback((e) => {
    const lastPoint = lastPointRef.current;
    const point = {x: e.pageX, y: e.pageY};
    lastPointRef.current = point;

    setPanState(panState => {
      const delta = {
        x: lastPoint.x - point.x,
        y: lastPoint.y - point.y
      }
      const panX = panState.x + delta.x
      const panY = panState.y + delta.y
      return {
        x: panX > 0 ? panX : 0,
        y: panY > 0 ? panY : 0
      }
    })

  }, [lastPointRef]);

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
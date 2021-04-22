import {useCallback, useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {offsetChanged} from "../features/navigationSlice";
import {useDimension, calcMaxOffset} from "./functionatitys";


const ORIGIN = Object.freeze({x: 0, y: 0});

export default function usePan(canvasRef) {
  const [panState, setPanState] = useState(ORIGIN);
  const lastPointRef = useRef(ORIGIN);
  const scale = useSelector(state => state.navigation.scale);
  const offset = useSelector(state => state.navigation.offset);
  const dispatch = useDispatch();

  const dimRef = useDimension(canvasRef);

  const pan = useCallback((e) => {

    const lastPoint = lastPointRef.current;
    // const point = e.center;
    const point = {x: e.pageX, y: e.pageY};
    lastPointRef.current = point;

    setPanState(panState => {
      const delta = {
        x: lastPoint.x - point.x,
        y: lastPoint.y - point.y
      }
      const currentOffset = {x: panState.x + delta.x, y: panState.y + delta.y};

      return calcMaxOffset(scale, dimRef.current, currentOffset);
    })

  }, [dimRef, scale]);

  const endPan = useCallback(() => {
    document.removeEventListener('mousemove', pan);
    document.removeEventListener('mouseup', endPan);
    document.removeEventListener('pan', pan);
    document.removeEventListener('panend', endPan);
  }, [pan])

  const startPan = useCallback((e) => {
    document.addEventListener('mousemove', pan);
    document.addEventListener('mouseup', endPan);
    // document.addEventListener('pan', pan);
    // document.addEventListener('panend', endPan);
    // lastPointRef.current = e.center;
    lastPointRef.current = {x: e.pageX, y: e.pageY}
  }, [endPan, pan])

  useEffect(() => {
    dispatch(offsetChanged({offset: panState}))
  }, [dispatch, panState])

  useEffect(() => {
    setPanState(offset);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale])

  return [startPan, pan];
}


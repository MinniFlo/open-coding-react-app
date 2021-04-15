import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

export const useDimension = (ref) => {
  const [dim, setDim] = useState({x:0, y:0});
  const [maxOffset, setMaxOffset] = useState({x:0, y:0});
  const scale = useSelector(state => state.navigation.scale);

  useEffect(() => {
    if (ref.current !== null){
      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;
      setDim({
        x: width,
        y: height,
      })
      setMaxOffset( {
        x: width - width*0.1/scale,
        y: height - height*0.1/scale,
      })
    }
  }, [ref, setDim, scale])


  return [dim, maxOffset];
}

export const useLast = (val) => {
  const lastRef = useRef(null);
  const returnRef = useRef(null);

  useEffect(() => {
    returnRef.current = lastRef.current;
    lastRef.current = val;
  }, [val])

  return returnRef.current !== null ? returnRef.current : val;
}
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

export const useDimension = (ref) => {
  const [dim, setDim] = useState({x:0, y:0});

  useEffect(() => {
    if (ref.current !== null){
      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;
      setDim({
        x: width,
        y: height,
      })

    }
  }, [ref, setDim])
  return dim;
}

export const calcMaxOffset = (scale, dim, adjOffset) => {
  const maxOffset = {
    x: dim.x - dim.x * 0.1 / scale,
    y: dim.y - dim.y * 0.1 / scale,
  }

  if (adjOffset.x < 0) {
    adjOffset.x = 0;
  }
  else if (adjOffset.x/scale > maxOffset.x) {
    adjOffset.x = maxOffset.x*scale;
  }

  if (adjOffset.y < 0) {
    adjOffset.y = 0;
  }
  else if (adjOffset.y/scale > maxOffset.y) {
    adjOffset.y = maxOffset.y*scale;
  }

  return adjOffset;
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
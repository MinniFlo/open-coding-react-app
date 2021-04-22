import {useEffect, useRef} from "react";
import {customAlphabet} from "nanoid";


export const useDimension = (ref) => {
  const dim = useRef({x:0, y:0});
  useEffect(() => {
    console.log(ref)
    if (ref.current !== null){
      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;
      dim.current = {x: width, y: height,}
    }
  }, [ref])
  return dim;
}

export const calcMaxOffset = (scale, dim, offset) => {
  const maxOffset = {
    x: dim.x - dim.x * 0.1 / scale,
    y: dim.y - dim.y * 0.1 / scale,
  }

  let adjOffset = {...offset};

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

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 21)
export const customId = () => nanoid();

const hexColor = customAlphabet("23456789abcd", 6);
export const genColor = () => "#" + hexColor();

// export const useLast = (val) => {
//   const lastRef = useRef(null);
//   const returnRef = useRef(null);
//
//   useEffect(() => {
//     returnRef.current = lastRef.current;
//     lastRef.current = val;
//   }, [val])
//
//   return returnRef.current !== null ? returnRef.current : val;
// }
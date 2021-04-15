import React, {useLayoutEffect, useRef, useState} from "react";
import Note from "./Note"
import {selectNoteIds} from "../features/notesSlice";
import {useSelector} from "react-redux";
import "../style/App.css";
import useScale from "../misc/zoom_logic";
import usePan from "../misc/pan_logic";



export default function Workspace(props) {
  const noteIds = useSelector(selectNoteIds)
  const scaleRef = useRef(null);
  const canvasRef = useRef(null);
  const startPan = usePan(canvasRef);
  const [buffer, setBuffer] = useState({x:0, y:0});
  useScale(scaleRef);
  const offset = useSelector(state => state.navigation.offset);
  const scale = useSelector(state => state.navigation.scale);

  const notes = noteIds.map((id) =>
    <Note key={id} id={id}/>
  );

  const adjOffsetX = -offset.x/scale;
  const adjOffsetY = -offset.y/scale;

  useLayoutEffect(() => {
    const height = scaleRef.current?.clientHeight ?? 0;
    const width = scaleRef.current?.clientWidth ?? 0;

    setBuffer({
      x: (width - width / scale) / 2,
      y: (height - height / scale) / 2,
    })
  }, [scale, setBuffer])




  const handleDrag = (e) => {
    if (e.target.id !== "note") {
      startPan(e);
    }
  };

  return (
    <div id="scaleWrapper" className="scaleWrapper" ref={scaleRef} style={{
      transform: 'scale(' + scale + ')',
    }}>
      <div id="canvas" className="canvas" ref={canvasRef} onMouseDown={handleDrag} style={{
        transform: 'translate('+ adjOffsetX +'px, '+ adjOffsetY +'px)',
        top: buffer.y,
        left: buffer.x,
        bottom: buffer.y,
        right: buffer.x,
      }}>

        {notes}
      </div>
    </div>
  );
}
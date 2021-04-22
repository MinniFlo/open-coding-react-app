import React, {useRef} from "react";
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
  const [startPan,] = usePan(canvasRef);
  useScale(canvasRef);

  // const noteDragged = useSelector(state => state.navigation.noteDragged)
  const offset = useSelector(state => state.navigation.offset);
  const scale = useSelector(state => state.navigation.scale);

  const notes = noteIds.map((id) =>
    <Note key={id} id={id}/>
  );

  const adjOffsetX = -offset.x/scale;
  const adjOffsetY = -offset.y/scale;

  const handleMouseDown = (e) => {
    if (e.target.id === "canvas") {
      startPan(e);
    }
  }


  // const handlePanStart = (e) => {
  //   if (e.target.id === "canvas") {
  //     startPan(e);
  //   }
  // };
  //
  // const handlePan = (e) => {
  //   if (!noteDragged) {
  //     calcPan(e);
  //   }
  // };

  return (
    <div id="scaleWrapper" className="scaleWrapper" ref={scaleRef} style={{
      transform: 'scale(' + scale + ')',
    }}>
      {/*<HammerComponent onPanStart={handlePanStart} onPan={handlePan} onPinch={(e) => console.log(e)}>*/}
        <div id="canvas" className="canvas" ref={canvasRef} onMouseDown={handleMouseDown} style={{
          transform: 'translate('+ adjOffsetX +'px, '+ adjOffsetY +'px)'}}
        >
          {notes}
        </div>
      {/*</HammerComponent>*/}
    </div>
  );
}
import React from "react";
import Note from "./Note"
import {selectNoteIds} from "../features/notesSlice";
import {useSelector} from "react-redux";
import "../style/App.css"
import usePan from "../misc/pan_logic";


export default function Workspace(props) {
  const noteIds = useSelector(selectNoteIds)
  const [offset, startPan] = usePan();

  const notes = noteIds.map((id) =>
    <Note key={id} id={id}/>
  );

  const handleDrag = (e) => {

    if (e.target.id !== "note") {
      startPan(e);
    }
  };

  return (
      // <div id="canvas" className="canvas">
      //   {notes}
      // </div>
    <div>
      <div id="canvas" className="canvas" onMouseDown={handleDrag} style={{transform: 'translate('+ -offset.x +'px, '+ -offset.y +'px)'}}>
        {notes}
      </div>
    </div>
  );
}
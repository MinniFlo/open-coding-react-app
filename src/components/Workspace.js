import React from "react";
import Note from "./Note"
import {selectNoteIds} from "../features/notesSlice";
import {useSelector} from "react-redux";
import "../style/App.css"


export default function Workspace(props) {
  const noteIds = useSelector(selectNoteIds)

  const notes = noteIds.map((id) =>
    <Note key={id} id={id}/>
  );

  return (
    <div id="canvas" className="canvas">
      {notes}
    </div>
  );
}
import React from "react";
import AddMenu from "./AddMenu";
import {workSpaceStyle} from "../style/style";
import Note from "./Note"
import {selectNoteIds} from "../features/notesSlice";
import {useSelector} from "react-redux";


const {canvasStyle, noteWrapperStyle} = workSpaceStyle;

export default function Workspace(props) {
  const noteIds = useSelector(selectNoteIds)

  const notes = noteIds.map((id) =>
    <Note key={id} id={id}/>
  );

  return (
    <div id="Workspace" style={canvasStyle}>
      <AddMenu />
      <div id="NoteWrapper" style={noteWrapperStyle}>
        {notes}
      </div>
    </div>
  );
}
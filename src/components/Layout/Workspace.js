import React from "react";
import AddMenu from "../AddMenu";
import {workSpaceStyle} from "../../style/style";
import Note from "./Note"


const {canvasStyle, noteWrapperStyle} = workSpaceStyle;

export default function Workspace(props) {
  const notes = props.notes.map((noteObj) =>
    <Note key={noteObj.content} content={noteObj.content} comment={noteObj.comment} labels={noteObj.labels}/>
  );

  return (
    <div id="Workspace" style={canvasStyle}>
      <AddMenu newNote={props.newNote} labels={props.labels}/>
      <div id="NoteWrapper" style={noteWrapperStyle}>
        {notes}
      </div>
    </div>
  );
}
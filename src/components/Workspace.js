import React from "react";
import '../style/App.css'
import Note from "./Note";

export default function Workspace(props) {

  const notesList = props.notes.map((text) =>
    <Note key={text} text = {text} />
  );

  return (
    <div id='Workspace'>
      {notesList}
    </div>
  );
}
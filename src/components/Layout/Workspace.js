import React from "react";
import '../../style/App.css'
import NoteCreator from "../NoteCreator";

export default function Workspace(props) {


  return (
    <div id='Workspace'>
      <NoteCreator createSingleNote={props.createSingleNote}/>
      <div id='NoteWrapper'>
        {props.notes}
      </div>
    </div>
  );
}
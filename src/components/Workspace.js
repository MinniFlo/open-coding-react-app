import React from "react";
import '../style/App.css'
import Note from "./Note";

export default function Workspace(props) {

  return (
    <div id='Workspace'>
      {props.notes}
    </div>
  );
}
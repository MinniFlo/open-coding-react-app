import React from "react";
import '../style/App.css'

export default function Workspace(props) {
  return (
    <div id='Workspace'>
      {props.notes}
    </div>
  );
}
import React from "react";
import '../style/App.css'


export default function PopUp(props) {
  return(
    <div className="row valign-wrapper popup">
      <p className="left" style={{margin: 0, marginRight: "16px"}}>{props.text}</p>
      <button className="btn-flat right" onClick={props.onNo}>no</button>
      <button className="btn-flat right" onClick={props.onYes}>yes</button>
    </div>
  );
}
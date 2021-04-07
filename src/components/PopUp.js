import React from "react";
import '../style/App.css'


export default function PopUp(props) {
  return(
    <div className="popup">
      <p className="popup-text">{props.text}</p>
      <button className="btn-flat left darken-1" onClick={props.onNo}>no</button>
      <button className="btn-flat right darken-1" onClick={props.onYes}>yes</button>
    </div>
  );
}
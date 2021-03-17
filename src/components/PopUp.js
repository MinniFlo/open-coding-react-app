import React from "react";
import '../style/App.css'


export default function PopUp(props) {


  return(
    <div className="card" style={{position: "fixed", top: props.position.x + "px", left: props.position.y + "px"}}>
      <p>delete Note?</p>
      <button className="btn-flat" onClick={props.onYes}>yes</button>
      <button className="btn-flat" onClick={props.onNo}>no</button>
    </div>
  );
}
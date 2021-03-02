import React from "react";
import '../style/App.css'
import {colors, detailStyle} from "../style/style";


const {backgroundStyle, textStyle, labelStyle} = detailStyle

export default function DetailNote(props) {

  const handleClose = () => props.toggleDetail();

  return (
    <div className={"card " + colors.background + colors.text} style={backgroundStyle}>
      <span style={labelStyle}>Content:</span>
      <p style={textStyle}>{props.content}</p>
      <span style={labelStyle}>Comment:</span>
      <p style={textStyle}>{props.comment}</p>
      <button className="btn waves-effect waves-light" onClick={handleClose} style={labelStyle}>close</button>
    </div>
  );
}
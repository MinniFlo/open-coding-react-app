import React from "react";
import {colors, spacing} from "../style/style";
import {Add} from "@material-ui/icons";


export default function AddButton(props) {
  const buttonStyle = {
    position: "fixed",
    borderRadius: 30,
    margin: spacing["3"],
    lineHeight: 0,
    zIndex: 1,
  }

  const symbolStyle = {
    fontSize: 40,
    padding: spacing["1"],
  }

  return (
    <div className={colors.accent + " z-depth-1"} style={buttonStyle} onClick={props.onClick}>
      <Add className={colors.text} style={symbolStyle}/>
    </div>
  );
}
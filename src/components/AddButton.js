import React from "react";
import {Add} from "@material-ui/icons";
import '../style/App.css'


export default function AddButton(props) {

  return (
    <div className="addButton"  onClick={props.onClick}>
      <Add className="addSymbol" style={{fontSize: "40px"}}/>
    </div>
  );
}
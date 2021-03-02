import React from "react";
import {useSelector} from "react-redux";
import {selectLabelById} from "../features/labelsSlice";


export default function TagListItem({id, style}) {
  const label = useSelector(state => selectLabelById(state, id));
  const colorStyle = {padding: "8px", marginRight: "4px", borderRadius: 2, backgroundColor: label.color};

  return (
    <li className="row valign-wrapper" id={label.id} style={style}>
      <div className="col s1" style={colorStyle}/>
      <span className="col s11 truncate">{label.name}</span>
    </li>
  );
}
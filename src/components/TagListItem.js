import React from "react";
import {useSelector} from "react-redux";
import {selectLabelById} from "../features/labelsSlice";
import '../style/App.css'


export default function TagListItem({id}) {
  const label = useSelector(state => selectLabelById(state, id));

  return (
    <li className="valign-wrapper sidebarLi" id={label.id}>
      <div className="colorSymbol" style={{backgroundColor: label.color}}/>
      <span className="truncate">{label.name}</span>
    </li>
  );
}
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectLabelById} from "../features/labelsSlice";
import '../style/App.css'
import LabelAddMenu from "./LabelAddMenu";


export default function TagListItem({id}) {
  const label = useSelector(state => selectLabelById(state, id));
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);


  return (
    <>
      <li className="valign-wrapper sidebarLi"  id={label.id} onDoubleClick={toggleEdit}>
        <div className="colorSymbol" style={{backgroundColor: label.color}}/>
        <span className="truncate">{label.name}</span>
      </li>
      {edit &&
      <div className="menuBackground">
        <LabelAddMenu toggleOpen={toggleEdit} id={label.id} name={label.name} color={label.color} labels={label.labels}/>
      </div>
      }
    </>
  );
}
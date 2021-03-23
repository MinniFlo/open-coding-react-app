import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {labelDeleted, selectLabelById} from "../features/labelsSlice";
import '../style/App.css'
import LabelAddMenu from "./LabelAddMenu";
import {Delete} from "@material-ui/icons";
import PopUp from "./PopUp";


export default function LabelListItem({id, indent}) {
  const label = useSelector(state => selectLabelById(state, id));
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const toggleEdit = () => {
    setPopUpOpen(false);
    setEdit(!edit);
  }
  const togglePopup = () => setPopUpOpen(!popUpOpen);
  const handleDelete = () => {
    toggleEdit();
    dispatch(labelDeleted({id: id}))
  }


  return (
    <>
      <li
        className="valign-wrapper sidebarLi"
        id={label.id}
        style={{marginLeft: 16 * indent + "px"}}
        onDoubleClick={toggleEdit}
      >
        <div className="colorSymbol" style={{backgroundColor: label.color}}/>
        <span className="truncate">{label.name}</span>
      </li>
      {edit &&
      <div className="menuBackground">
        <div className="row menuContent" style={{margin: 0}}>
          <h5 className="grey-text menuHeading left">Edit Label</h5>
          <Delete className="detailNoteIcon right" onClick={togglePopup}/>
        </div>
        {popUpOpen && <PopUp onYes={handleDelete} onNo={togglePopup} text="delete this Note?"/>}
        <LabelAddMenu toggleOpen={toggleEdit} id={label.id} name={label.name} color={label.color} labels={label.labels}/>
      </div>
      }
    </>
  );
}
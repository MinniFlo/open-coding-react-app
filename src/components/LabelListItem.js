import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {labelDeleted, selectLabelById, labelToggleHighlight} from "../features/labelsSlice";
import {noteLabelDeleted} from "../features/notesSlice";
import '../style/App.css'
import LabelAddMenu from "./LabelAddMenu";
import {Delete, MoreVert} from "@material-ui/icons";
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
  const toggleHighlight = () => dispatch(labelToggleHighlight({id: id}));
  const handleDelete = () => {
    toggleEdit();
    dispatch(labelDeleted({id: id}));
    dispatch(noteLabelDeleted({id: id}));
  }

  return (
    <>
      <li
        className="valign-wrapper sidebarLi"
        id={label.id}
        style={{marginLeft: 16 * indent + "px"}}
      >
        <div className={label.highlight ? "valign-wrapper liContent active" : "valign-wrapper liContent"}
             onClick={toggleHighlight}
        >
          <div className="colorSymbol" style={{backgroundColor: label.color}}/>
          <span className="truncate">{label.name}</span>
        </div>
        <MoreVert className="right-align" onClick={toggleEdit} style={{marginRight: "4px"}}/>
      </li>
      {edit &&
      <div className="menuBackground">
        <div className="row menuContent" style={{margin: 0}}>
          <h5 className="grey-text menuHeading left">Edit Label</h5>
          <Delete className="detailNoteIcon right" onClick={togglePopup}/>
        </div>
        {popUpOpen && <PopUp onYes={handleDelete} onNo={togglePopup} text="delete this Label?"/>}
        <LabelAddMenu toggleOpen={toggleEdit}
                      id={label.id}
                      name={label.name}
                      color={label.color}
                      labels={label.labels}
                      highlight={label.highlight}/>
      </div>
      }
    </>
  );
}
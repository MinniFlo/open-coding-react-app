import React, {useState} from "react";
import '../style/App.css'
import NoteAddMenu from "./NoteAddMenu";
import Draggable from "react-draggable";
import {Edit, Delete, LibraryAdd} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {noteDeleted, noteAdded} from "../features/notesSlice";
import {nanoid} from "@reduxjs/toolkit";
import PopUp from "./PopUp";


export default function DetailNote({note, position ,toggleDetail}) {

  const [edit, setEdit] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false)

  const dispatch = useDispatch();

  const handleClose = () => toggleDetail();
  const toggleEdit = () => setEdit(!edit);
  const handleCopy = () => {
    toggleDetail();
    dispatch(noteAdded(
      {id: nanoid(),
        content: note.content,
        labels: note.labels,
        comment: note.comment,
        position: {x: note.position.x + 184, y: note.position.y},}
    ))
  };
  const handleDelete = () => {
    toggleDetail();
    dispatch(noteDeleted(note.id))
  };
  const togglePopup = () => setPopUpOpen(!popUpOpen);

  const labels = note.labels.length === 0 ?
    // if note obtains no labels
    <p className="grey-text menuText">no Labels selected! </p> :
    // else
    <div className="labelGrid">
      {note.labels.map(label =>
        <div
        className="labelGridItem valign-wrapper"
        id={label.id}
        key={label.id}
        style={{cursor: "auto"}}
        >
        <div className="labelColorIcon" style={{backgroundColor: label.color}}/>
        <span className="truncate">{label.name}</span>
        </div>
      )}
    </div>

  const offset = 112;
  const currentPosition = position.x < offset ? {x: 0, y: position.y}: {x: position.x - 112, y: position.y};
  const nodeRef = React.useRef(null);

  return (
    <Draggable onStart={() => false} position={currentPosition} nodeRef={nodeRef}>
      <div className="detailNote" ref={nodeRef}>
        {edit ?
          <>
            <h5 className="grey-text menuHeading menuContent">Edit Note</h5>
            <NoteAddMenu
              id={note.id}
              toggleOpen={toggleEdit}
              content={note.content}
              labels={note.labels}
              comment={note.comment}
              position={note.position}
              edit={true} />
          </> :

          <div className="menuContent">
            <div className="row" style={{margin: 0}}>
              <h5 className="grey-text menuHeading left">Note</h5>
              <Delete className="detailNoteIcon right" onClick={togglePopup}/>
              <LibraryAdd className="detailNoteIcon right" onClick={handleCopy}/>
              <Edit className="detailNoteIcon right"  onClick={toggleEdit}/>
            </div>
            <div>
              <span className="grey-text">Content</span>
              <p className="menuText">{note.content}</p>
            </div>
            <div className="labelContainer">
              <span className="grey-text">Label</span>
              {labels}
            </div>
            <div>
              <span className="grey-text">Comment</span>
              <p className="menuText">{note.comment}</p>
            </div>
            <button className="btn waves-effect waves-light grey darken-1" onClick={handleClose}>close</button>
          </div>
        }
        {popUpOpen && <PopUp onYes={handleDelete} onNo={togglePopup} position={currentPosition}/>}
      </div>
    </Draggable>

  );
}
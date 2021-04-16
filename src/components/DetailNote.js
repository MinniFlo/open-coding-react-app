import React, {useState} from "react";
import '../style/App.css'
import NoteAddMenu from "./NoteAddMenu";
import Draggable from "react-draggable";
import {Delete, LibraryAdd} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {noteDeleted, noteAdded} from "../features/notesSlice";
import {customId} from "../style/style";
import PopUp from "./PopUp";


export default function DetailNote({note, position ,toggleDetail}) {

  const [popUpOpen, setPopUpOpen] = useState(false)

  const dispatch = useDispatch();

  const handleClose = () => toggleDetail();
  const handleCopy = () => {
    toggleDetail();
    dispatch(noteAdded(
      {id: customId(),
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


  const offset = 112;
  const currentPosition = position.x < offset ? {x: 0, y: position.y}: {x: position.x - 112, y: position.y};
  const nodeRef = React.useRef(null);

  return (
    <Draggable onStart={() => false} position={currentPosition} nodeRef={nodeRef}>
      <div id="note" className="detailNote menuContent" ref={nodeRef}>
            <div className="row" style={{margin: 0}}>
              <h5 className="grey-text menuHeading left">Edit Note</h5>
              <Delete className="detailNoteIcon right" onClick={togglePopup}/>
              <LibraryAdd className="detailNoteIcon right" onClick={handleCopy}/>
            </div>
            {popUpOpen && <PopUp onYes={handleDelete} onNo={togglePopup} text="delete this Note?"/>}
            <NoteAddMenu
              id={note.id}
              toggleOpen={handleClose}
              content={note.content}
              labels={note.labels}
              comment={note.comment}
              position={note.position}
              edit={true} />

        {/*  <div className="menuContent">*/}
        {/*    <div className="row" style={{margin: 0}}>*/}
        {/*      <h5 className="grey-text menuHeading left">Note</h5>*/}
        {/*      <Delete className="detailNoteIcon right" onClick={togglePopup}/>*/}
        {/*      <LibraryAdd className="detailNoteIcon right" onClick={handleCopy}/>*/}
        {/*      <Edit className="detailNoteIcon right"  onClick={toggleEdit}/>*/}
        {/*    </div>*/}
        {/*    {popUpOpen && <PopUp onYes={handleDelete} onNo={togglePopup} text="delete this Note?"/>}*/}
        {/*    <div>*/}
        {/*      <span className="grey-text">Content</span>*/}
        {/*      <p className="menuText">{note.content}</p>*/}
        {/*    </div>*/}
        {/*    <div className="labelContainer">*/}
        {/*      <span className="grey-text">Label</span>*/}
        {/*      {labels}*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <span className="grey-text">Comment</span>*/}
        {/*      <p className="menuText">{note.comment}</p>*/}
        {/*    </div>*/}
        {/*    <button className="btn waves-effect waves-light grey darken-1" onClick={handleClose}>close</button>*/}
        {/*  </div>*/}
      </div>
    </Draggable>
  );
}
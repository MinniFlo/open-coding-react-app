import React, {useState} from "react";
import '../style/App.css'
import NoteAddMenu from "./NoteAddMenu";
import {Delete, LibraryAdd} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {noteDeleted, noteAdded} from "../features/notesSlice";
import {customId} from "../misc/functionatitys";
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

  return (
      <div id="note" className="detailNote menuContent"
           style={{transform: 'translate(' + currentPosition.x + 'px, ' + currentPosition.y + 'px)'}}>
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
            />
      </div>
  );
}
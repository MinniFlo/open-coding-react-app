import React, {useState} from "react";
import '../style/App.css'
import {addMenuStyle, colors, spacing, detailStyle} from "../style/style";
import NoteAddMenu from "./NoteAddMenu";
import Draggable from "react-draggable";
import {Edit, Delete, LibraryAdd} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {noteDeleted, noteAdded} from "../features/notesSlice";
import {nanoid} from "@reduxjs/toolkit";


const {labelItemStyle, labelContainerStyle, labelGridStyle, elementStyle, textStyle} = addMenuStyle

export default function DetailNote({note, position ,toggleDetail}) {

  const [edit, setEdit] = useState(false);

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

  const labels = note.labels.length === 0 ?
    // if note obtains no labels
    <p className="grey-text" style={textStyle}>no Labels selected! </p> :
    // else
    <div style={labelGridStyle}>
      {note.labels.map(label => {
        const colorStyle = {
        padding: spacing["2"],
        borderRadius: 2,
        backgroundColor: label.color,
        margin: spacing["2"],
      };
        return (
        <div
        className="valign-wrapper"
        id={label.id}
        key={label.id}
        style={labelItemStyle}
        >
        <div style={colorStyle}/>
        <span className="truncate">{label.name}</span>
        </div>
        );
      })}
    </div>

  const offset = 112;
  const currentPosition = position.x < offset ? {x: 0, y: position.y}: {x: position.x - 112, y: position.y};
  const nodeRef = React.useRef(null);

  const iconBarStyle = {margin: spacing["2"], marginBottom:0}

  return (
    <Draggable onStart={() => false} position={currentPosition} nodeRef={nodeRef}>
      <div className={"card " + colors.background + colors.text} style={detailStyle.backgroundStyle} ref={nodeRef}>

        {edit ?
          <>
            <h5 className="grey-text" style={labelContainerStyle}>Edit Note</h5>
            <NoteAddMenu
              id={note.id}
              toggleOpen={toggleEdit}
              content={note.content}
              labels={note.labels}
              comment={note.comment}
              position={note.position}
              edit={true} />

          </> :

          <>
            <div className="row" style={{margin: 0, marginRight: spacing["2"]}}>
              <h5 className="grey-text left" style={iconBarStyle}>Note</h5>
              <div className="col s1 right" style={{padding: 0, cursor: "pointer"}}>
                <Delete style={iconBarStyle} onClick={handleDelete}/>
              </div>
              <div className="col s1 right" style={{padding: 0, cursor: "pointer"}}>
                <LibraryAdd style={iconBarStyle} onClick={handleCopy}/>
              </div>
              <div className="col s1 right" style={{padding: 0, cursor: "pointer" }}>
                <Edit style={iconBarStyle} onClick={toggleEdit}/>
              </div>
            </div>
            <div style={elementStyle}>
              <span className="grey-text">Content</span>
              <p style={textStyle}>{note.content}</p>
            </div>
            <div style={labelContainerStyle}>
              <span className="grey-text">Label</span>
              {labels}
            </div>
            <div style={elementStyle}>
              <span className="grey-text">Comment</span>
              <p style={textStyle}>{note.comment}</p>
            </div>
            <button className="btn waves-effect waves-light grey darken-1" onClick={handleClose} style={elementStyle}>close</button>
          </>

        }
      </div>
    </Draggable>

  );
}
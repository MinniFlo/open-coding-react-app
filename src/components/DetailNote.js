import React, {useState} from "react";
import '../style/App.css'
import {addMenuStyle, colors, spacing, detailStyle} from "../style/style";
import NoteAddMenu from "./NoteAddMenu";
import Draggable from "react-draggable";


const {labelItemStyle, labelContainerStyle, labelGridStyle, elementStyle, textStyle} = addMenuStyle

export default function DetailNote({note, position ,toggleDetail}) {

  const [edit, setEdit] = useState(false);

  const handleClose = () => toggleDetail();

  const toggleEdit = () => setEdit(!edit);

  const labels = note.labels.length === 0 ?
    // if note obtains no labels
    <p className="grey-text" style={textStyle}>no Labels selected ...</p> :
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



  return (
    <Draggable onStart={() => false} position={currentPosition}>
      <div className={"card " + colors.background + colors.text} style={detailStyle.backgroundStyle}>

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
            <button className="btn waves-effect waves-light" onClick={toggleEdit} style={elementStyle}>edit</button>
          </>

        }
      </div>
    </Draggable>

  );
}
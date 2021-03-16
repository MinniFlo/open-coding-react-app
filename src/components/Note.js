import React, {useState} from "react";
import '../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable';
import {colors, spacing} from "../style/style";
import {MoreHoriz, Attachment} from "@material-ui/icons";
import {noteStyle} from "../style/style";
import {useDispatch, useSelector} from "react-redux";
import {notePositionChanged, selectNoteById} from "../features/notesSlice";


const {elementStyle, backgroundStyle, contentStyle, iconStyle, tagLiStyle, tagUlStyle} = noteStyle;

export default function Note({id}) {

  const [detail, setDetail] = useState(false);


  const note = useSelector(state => selectNoteById(state, id));
  const dispatch = useDispatch();

  const [currentPosition, setCurrentPosition] = useState(note.position);

  const toggleDetail = () => setDetail(!detail);
  const onStop = (e, position) => {
    const newPos = {x: position.x, y: position.y};
    setCurrentPosition(newPos);
    dispatch(notePositionChanged({
      noteId: note.id,
      position: newPos
    }));
  }

  const labels  = note.labels.map(label => {
    const tagStyle = {
      height: spacing["4"],
      width: spacing["4"],
      padding: 0,
      margin: 0,
      borderRadius: 1,
      boxShadow: "0 1px 2px rgba(20, 20, 20, 0.5)",
      backgroundColor: label.color};
    return (
      <li key={label.id} style={tagLiStyle}>
        <div style={tagStyle}/>
      </li>
    );
  });

  const nodeRef = React.useRef(null);

  return (
    <>
      {detail ? <DetailNote note={note} position={currentPosition} toggleDetail={toggleDetail}/> :
        <Draggable bounds="parent" position={currentPosition} onStop={onStop} nodeRef={nodeRef}>
            <div style={elementStyle} ref={nodeRef}>
              <div className={"card" + colors.background + colors.text} style={backgroundStyle}>
                {note.comment !== "" ? <Attachment className="left" style={iconStyle}/>:<></>}
                <MoreHoriz
                  className="right"
                  style={iconStyle}
                  onClick={toggleDetail}
                />
                <p style={contentStyle}>{note.content}</p>
              </div>
              <ul style={tagUlStyle}>
                {labels}
              </ul>
            </div>
        </Draggable>
      }
    </>
  );
}
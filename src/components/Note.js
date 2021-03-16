import React, {useState} from "react";
import '../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable';
import {MoreHoriz, Attachment} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {notePositionChanged, selectNoteById} from "../features/notesSlice";


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
    return (
      <div key={label.id} className="noteLabelItem" style={{backgroundColor: label.color}}/>
    );
  });

  const nodeRef = React.useRef(null);

  return (
    <>
      {detail ? <DetailNote note={note} position={currentPosition} toggleDetail={toggleDetail}/> :
        <Draggable bounds="parent" position={currentPosition} onStop={onStop} nodeRef={nodeRef}>
            <div className="note" ref={nodeRef}>
              <div className="noteBackground">
                {note.comment !== "" ? <Attachment className="noteIcon left"/>:<></>}
                <MoreHoriz
                  className="noteIcon right"
                  onClick={toggleDetail}
                />
                <p className="noteContent">{note.content}</p>
              </div>
              {/*<ul style={tagUlStyle}>*/}
              {/*  {labels}*/}
              {/*</ul>*/}
              <div className="noteLabelGrid">
                {labels}
              </div>
            </div>
        </Draggable>
      }
    </>
  );
}
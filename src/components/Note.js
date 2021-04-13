import React, {useState} from "react";
import '../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable';
import {MoreHoriz, Comment} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {notePositionChanged, selectNoteById} from "../features/notesSlice";


export default function Note({id}) {

  const [detail, setDetail] = useState(false);


  const note = useSelector(state => selectNoteById(state, id));
  const scale = useSelector( state => state.navigation.scale);
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
      <div key={label.id} id="note" className="noteLabelItem" style={{backgroundColor: label.color}}/>
    );
  });

  const nodeRef = React.useRef(null);

  return (
    <>
      {detail ? <DetailNote note={note} position={currentPosition} toggleDetail={toggleDetail}/> :
        <Draggable bounds="parent" position={currentPosition} onStop={onStop} nodeRef={nodeRef} scale={scale}>
            <div id="note" className="note" ref={nodeRef}>
              <div id="note" className="noteBackground">
                {note.comment !== "" && <Comment className="noteIcon comment left"/>}
                <MoreHoriz
                  className="noteIcon right"
                  onClick={toggleDetail}
                />
                <p id="note" className="noteContent">{note.content}</p>
              </div>
              <div id="note" className="noteLabelGrid">
                {labels}
              </div>
            </div>
        </Draggable>
      }
    </>
  );
}
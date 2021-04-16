import React, {useEffect, useState} from "react";
import '../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable';
import {MoreHoriz, Comment} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {notePositionChanged, selectNoteById} from "../features/notesSlice";
import {selectHighlightIds} from "../features/labelsSlice";


export default function Note({id}) {

  const [detail, setDetail] = useState(false);
  const [highlighted, setHighlighted] = useState(false);


  const note = useSelector(state => selectNoteById(state, id));
  const scale = useSelector( state => state.navigation.scale);
  const highlightedLabels = useSelector(selectHighlightIds);
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

  useEffect(() => {
    if (highlightedLabels.length === 0) {
      setHighlighted(true);
    } else {
      let highlight = false
      note.labels.forEach(label => {
        if (highlightedLabels.indexOf(label.id) !== -1) {
          highlight = true
        }
      })
      setHighlighted(highlight);
    }
  }, [highlightedLabels, note.labels])

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
              <div className="noteBackground" style={highlighted?{}:{backgroundColor:"#aaa"}}>
                {note.comment !== "" && <Comment className="noteIcon comment left"/>}
                <MoreHoriz
                  className="noteIcon right"
                  onClick={toggleDetail}
                />
                <p className="noteContent">{note.content}</p>
              </div>
              <div className="noteLabelGrid">
                {labels}
              </div>
            </div>
        </Draggable>
      }
    </>
  );
}
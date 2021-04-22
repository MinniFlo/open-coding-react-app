import React, {useEffect, useState} from "react";
import '../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable';
import {MoreHoriz, Comment} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {notePositionChanged, selectNoteById} from "../features/notesSlice";
import {selectHighlightIds, selectLabelsById} from "../features/labelsSlice";
import {noteDraggedChanged} from "../features/navigationSlice";
import HammerComponent from "react-hammerjs";


export default function Note({id}) {

  const [detail, setDetail] = useState(false);
  const [highlighted, setHighlighted] = useState(false);


  const note = useSelector(state => selectNoteById(state, id));
  const noteLabels = useSelector(selectLabelsById(note.labels));
  const scale = useSelector( state => state.navigation.scale);
  const highlightedLabels = useSelector(selectHighlightIds);
  const dispatch = useDispatch();

  const [currentPosition, setCurrentPosition] = useState(note.position);

  const toggleDetail = () => {
    setDetail(!detail)
    dispatch(noteDraggedChanged({noteDragged: false}))
  };
  const onStop = (e, position) => {
    const newPos = {x: position.x, y: position.y};
    setCurrentPosition(newPos);
    dispatch(notePositionChanged({
      noteId: note.id,
      position: newPos
    }));
    dispatch(noteDraggedChanged({noteDragged: false}))
  }
  const onStart = () => {
    dispatch(noteDraggedChanged({noteDragged: true}))
  }

  useEffect(() => {
    if (highlightedLabels.length === 0) {
      setHighlighted(true);
    } else {
      const highlight = note.labels.filter(id => highlightedLabels.indexOf(id) !== -1).length !== 0;
      setHighlighted(highlight);
    }
  }, [highlightedLabels, note.labels])

  const labels = noteLabels.map(label => {
    return (
      <div key={label.id} id="note" className="noteLabelItem" style={{backgroundColor: label.color}}/>
    );
  });

  const nodeRef = React.useRef(null);

  return (
    <>
      {detail ? <DetailNote note={note} position={currentPosition} toggleDetail={toggleDetail}/> :
        <Draggable bounds="parent" position={currentPosition} onStart={onStart} onStop={onStop} nodeRef={nodeRef} scale={scale}>
            <div id="note" className="note" ref={nodeRef}>
              <div id="note" className="noteBackground" style={highlighted?{}:{backgroundColor:"#aaa"}}>
                {note.comment !== "" && <Comment className="noteIcon comment left"/>}
                <HammerComponent onTap={toggleDetail}>
                  <MoreHoriz className="noteIcon right" onClick={toggleDetail}/>
                </HammerComponent>
                <p id="note" className="noteContent">{note.content}</p>
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
import React, {useState} from "react";
import {addMenuStyle} from "../style/style";
import {useDispatch} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";
import {noteAdded, noteChanged} from "../features/notesSlice";
import {useSelector} from "react-redux";
import {selectLabelIds} from "../features/labelsSlice";
import AddLabelField from "./AddLabelField";

const {textFormStyle, textFieldStyle, elementStyle, labelContainerStyle, labelGridStyle} = addMenuStyle;


export default function NoteAddMenu(props) {

  const [content, setContent] = useState(props.content);
  const [labels, setLabels] = useState(props.labels);
  const [comment, setComment] = useState(props.comment);

  const dispatch = useDispatch();
  const labelIds = useSelector(selectLabelIds);

  const handleContentChange = e => setContent(e.target.value);
  const handleCommentChange = e => setComment(e.target.value);
  const handleLabelSelect = (label, add) => {
    const labelId = label.id
    const newLabels = labels.filter(label => label.id !== labelId);
    if (add === true) {
      setLabels([...newLabels, label]);
    } else {
      setLabels(newLabels);
    }
  }

  const handleSubmit = () => {
    if (props.edit) {
      // called in DetailedNote
      dispatch(noteChanged(
        {
          id: props.id,
          content: content,
          labels: labels,
          comment: comment,
          position: props.position,
        }
      ));
    } else {
      // called in AddMenu
      dispatch(noteAdded(
        {
          id: nanoid(),
          content: content,
          labels: labels,
          comment: comment,
          position: props.position,
        }
      ));
    }

    setContent('');
    setComment('');
    setLabels([]);
    props.toggleOpen();
  };

  const selectLabelFields = labelIds.map(id => {
    const selected = labels.filter(label => label.id === id).length !== 0;
    return (
      <AddLabelField key={id} id={id} isSelected={selected} handleLabelSelect={handleLabelSelect}/>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-field" style={textFormStyle}>
          <textarea id="content" value={content} autoFocus={true} onChange={handleContentChange} className="materialize-textarea"
                    style={textFieldStyle}/>
          <label className="active" htmlFor="content">Content</label>
        </div>
        <div style={labelContainerStyle}>
          <span className="grey-text">Label</span>
          <div style={labelGridStyle}>
            {selectLabelFields}
          </div>
        </div>
        <div className="input-field" style={textFormStyle}>
          <textarea id="comment" value={comment} onChange={handleCommentChange} className="materialize-textarea"
                    style={textFieldStyle}/>
          <label className="active" htmlFor="comment">Comment</label>
        </div>
        <div>
          <button className="btn waves-effect waves-light grey darken-1" style={elementStyle}
                  onClick={props.toggleOpen}>
            back
          </button>
          <button className="btn waves-effect waves-light right" style={elementStyle} type='submit'>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
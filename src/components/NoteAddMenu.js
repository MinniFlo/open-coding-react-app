import React, {useState} from "react";
import {addMenuStyle} from "../style/style";
import {useDispatch} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";
import {noteAdded} from "../features/notesSlice";
import {useSelector} from "react-redux";
import {selectLabelIds} from "../features/labelsSlice";
import AddLabelField from "./AddLabelField";

const {textFormStyle, textFieldStyle, elementStyle} = addMenuStyle

export default function NoteAddMenu({toggleOpen}) {

  const [content, setContent] = useState('');
  const [labels, setLabels] = useState([]);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const labelIds = useSelector(selectLabelIds);

  const handleContentChange = e => setContent(e.target.value);
  const handleCommentChange = e => setComment(e.target.value);
  const handleLabelSelect = (label, add) => {
    if (add === true) {
      setLabels([ ...labels, label]);
    } else {
      const labelId = label.id
      const newLabels = labels.filter(label => label.id !== labelId);
      setLabels(newLabels);
    }
  }


  const handleSubmit = () => {
    dispatch(noteAdded(
      {
        id: nanoid(),
        content: content,
        labels: labels,
        comment: comment,
      }
    ))

    setContent('');
    setComment('');
    setLabels([]);
    toggleOpen();
  };

  const selectLabelFields = labelIds.map(id =>
    <AddLabelField key={id} id={id} handleLabelSelect={handleLabelSelect}/>
  )


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-field" style={textFormStyle}>
          <textarea id="content" onChange={handleContentChange} className="materialize-textarea" style={textFieldStyle}/>
          <label htmlFor="content">Content</label>
        </div>
        <div>
          <div style={{display: "grid", gridGap: "8px", padding: "8px", gridTemplateColumns: "120px 120px 120px"}}>
            {selectLabelFields}
          </div>
        </div>
        <div className="input-field" style={textFormStyle}>
          <textarea id="comment" onChange={handleCommentChange} className="materialize-textarea" style={textFieldStyle}/>
          <label htmlFor="comment">Comment</label>
        </div>
        <button className="btn waves-effect waves-light" style={elementStyle} type='submit'>
          submit
        </button>
      </form>
    </div>
  );
}
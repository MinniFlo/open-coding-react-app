import React, {useEffect, useState} from "react";
import {addMenuStyle} from "../style/style";
import { useDispatch, useSelector } from "react-redux";
import {customId} from "../style/style";
import {noteAdded, noteChanged} from "../features/notesSlice";
import {selectLabelIds} from "../features/labelsSlice";
import AddLabelField from "./AddLabelField";
import '../style/App.css';
import M from "materialize-css";

const {textFormStyle, textFieldStyle} = addMenuStyle;


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

  useEffect(() => {
    document.querySelectorAll('.materialize-textarea').forEach((area) => {
      M.textareaAutoResize(area);
    });
  }, [content, comment])

  const handleSubmit = () => {
    if (props.id !== "") {
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
          id: customId(),
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
    <div className="menuContent">
      <form onSubmit={handleSubmit}>
        <div className="input-field" style={textFormStyle}>
          <textarea id="content"
                    className="materialize-textarea"
                    value={content}
                    autoFocus={true}
                    onChange={handleContentChange}
                    style={textFieldStyle}/>
          <label className="active" htmlFor="content">Content</label>
        </div>
        <div className="labelContainer">
          <span className="grey-text">Labels</span>
          <div className="labelGrid">
            {selectLabelFields}
          </div>
        </div>
        <div className="input-field" style={textFormStyle}>
          <textarea id="comment"
                    className="materialize-textarea"
                    value={comment}
                    onChange={handleCommentChange}
                    style={textFieldStyle}/>
          <label className="active" htmlFor="comment">Comment</label>
        </div>
        <div>
          <button className="btn waves-effect waves-light grey darken-1" onClick={props.toggleOpen}>
            back
          </button>
          <button className="btn waves-effect waves-light right" type='submit'>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
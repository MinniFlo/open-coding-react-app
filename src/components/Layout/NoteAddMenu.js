import React, {useState} from "react";
import {addMenuStyle} from "../../style/style";

const {textFormStyle, textFieldStyle, elementStyle} = addMenuStyle

export default function NoteAddMenu({toggleOpen, newNote}) {

  const [content, setContent] = useState('');
  const [labels, setLabels] = useState([]);
  const [comment, setComment] = useState('');

  const handleContentChange = e => setContent(e.target.value);
  const handleCommentChange = e => setComment(e.target.value);
  const handleLabelChange = e => setLabels([ ...labels, e.target.value]);

  const handleSubmit = () => {
    newNote(content, labels, comment);
    setContent('');
    setComment('');
    setLabels([]);
    toggleOpen();
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-field" style={textFormStyle}>
          <textarea id="content" onChange={handleContentChange} className="materialize-textarea" style={textFieldStyle}/>
          <label htmlFor="content">Content</label>
        </div>
        <div>
          <div className="row  truncate" onChange={handleLabelChange}>
            <label className="col s6">
              <input id="le name" type="checkbox" className="filled-in"/>
              <span>le name</span>
            </label>
            <label className="col s6 grey-text text-darken-4">
              <input id="se veri long name" type="checkbox" className="filled-in"/>
              <span>wefwefwef</span>
            </label>
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
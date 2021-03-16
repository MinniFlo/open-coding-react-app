import React, {useState} from "react";
import {addMenuStyle} from "../style/style";
import {useDispatch} from "react-redux";
import {labelAdded} from "../features/labelsSlice";
import {nanoid} from "@reduxjs/toolkit";
import '../style/App.css'


const {textFormStyle, textFieldStyle, elementStyle} = addMenuStyle

export default function LabelAddMenu({toggleOpen}) {

  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const dispatch = useDispatch();

  const handleNameChange = e => setName(e.target.value);
  const handleColorChange = e => setColor(e.target.value);
  

  const handleSubmit = () => {
    dispatch(labelAdded(
      {
        id: nanoid(),
        name: name,
        color: color,
      }
    ))
    setName('');
    setColor('');
    toggleOpen();
  };

  return (
    <div className="menuContent">
      <form onSubmit={handleSubmit}>
        <div className="input-field" style={textFormStyle}>
          <textarea id="name" onChange={handleNameChange}  autoFocus={true} className="materialize-textarea" style={textFieldStyle}/>
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-field" style={textFormStyle}>
          <textarea id="color" onChange={handleColorChange} className="materialize-textarea" style={textFieldStyle}/>
          <label htmlFor="color">Color</label>
        </div>
        <div>
          <button className="btn waves-effect waves-light grey darken-1" onClick={toggleOpen}>
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
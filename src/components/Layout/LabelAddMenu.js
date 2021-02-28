import React, {useState} from "react";
import {addMenuStyle} from "../../style/style";

const {textFormStyle, textFieldStyle, elementStyle} = addMenuStyle

export default function LabelAddMenu({toggleOpen, newLabel}) {

  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleColorChange = e => setColor(e.target.value);

  const handleSubmit = () => {
    newLabel(name, color);
    setName('');
    setColor('');
    toggleOpen();
  };

  return (
    <div id="label col s12">
      <form onSubmit={handleSubmit}>
        <div className="input-field" style={textFormStyle}>
          <textarea id="name" onChange={handleNameChange} className="materialize-textarea" style={textFieldStyle}/>
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-field" style={textFormStyle}>
          <textarea id="color" onChange={handleColorChange} className="materialize-textarea" style={textFieldStyle}/>
          <label htmlFor="color">Color</label>
        </div>
        <button className="btn waves-effect waves-light" style={elementStyle} type='submit'>
          submit
        </button>
      </form>
    </div>
  );
}
import React, {useState} from "react";
import {addMenuStyle} from "../style/style";
import {useDispatch, useSelector} from "react-redux";
import {labelAdded, labelChanged, selectPossibleSubLabels} from "../features/labelsSlice";
import {customId, genColor} from "../style/style";
import '../style/App.css'
import AddLabelField from "./AddLabelField";
// import ColorPicker from '@mapbox/react-colorpickr'


const {textFormStyle, textFieldStyle} = addMenuStyle

export default function LabelAddMenu(props) {

  const [name, setName] = useState(props.name);
  const [color, setColor] = useState(props.color === "" ? genColor() : props.color);
  const [labels, setLabels] = useState(props.labels)

  const dispatch = useDispatch();
  const labelIds = useSelector(selectPossibleSubLabels(props.id));

  const handleNameChange = e => setName(e.target.value);
  const handleColorChange = e => setColor(e.target.value);
  const handleLabelSelect = (labelId, add) => {
    const newLabelIds = labels.filter(id => id !== labelId);
    if (add === true) {
      setLabels([...newLabelIds, labelId]);
    } else {
      setLabels(newLabelIds);
    }
  }
  

  const handleSubmit = () => {
    if (props.id !== "") {
      dispatch(labelChanged(
        {
          id: props.id,
          name: name,
          color: color,
          labels: labels,
          highlight: props.highlight,
        }
      ));
    } else {
      dispatch(labelAdded(
      {
        id: customId(),
        name: name,
        color: color,
        parentLabelId: "",
        labels: labels,
        highlight: props.highlight,
      }
    ));}

    setName('');
    setColor('');
    props.toggleOpen();
  };

  const structureLabels = (labelIds) => {
    const selectedIds = labelIds.filter(id => labels.indexOf(id) !== -1);
    const unselectedIds = labelIds.filter(id => selectedIds.indexOf(id) === -1);
    const selectedReturn = selectedIds.map((id) =>
      <AddLabelField key={id} id={id} isSelected={true} handleLabelSelect={handleLabelSelect}/>)
    const unSelectedReturn = unselectedIds.map((id) =>
      <AddLabelField key={id} id={id} isSelected={false} handleLabelSelect={handleLabelSelect}/>)
    return [...selectedReturn, ...unSelectedReturn];
  }

  const selectLabelFields = structureLabels(labelIds);


  return (
    <div className="menuContent">
      <form onSubmit={handleSubmit}>
        <div className="input-field" style={textFormStyle}>
          <textarea id="name"
                    className="materialize-textarea"
                    value={name}
                    onChange={handleNameChange}
                    autoFocus={true}
                    style={textFieldStyle}/>
          <label className="active" htmlFor="name">Name</label>
        </div>
        {/*<div>*/}
        {/*  <ColorPicker onChange={handleColorChange}/>*/}
        {/*</div>*/}
        <div className="input-field" style={textFormStyle}>
          <textarea id="color"
                    className="materialize-textarea"
                    value={color}
                    onChange={handleColorChange}
                    style={textFieldStyle}/>
          <label className="active" htmlFor="color">Color</label>
          <div style={{backgroundColor: color, padding: "4px", boarderRadius: 3}}/>
        </div>

        <div className="labelContainer">
          <span className="grey-text">Subordinate Labels</span>
          <div className="labelGrid">
            {selectLabelFields}
          </div>
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
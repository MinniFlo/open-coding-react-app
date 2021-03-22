import React, {useState} from "react";
import {addMenuStyle} from "../style/style";
import {useDispatch, useSelector} from "react-redux";
import {labelAdded, labelChanged, selectPossibleSubLabels} from "../features/labelsSlice";
import {customId} from "../style/style";
import '../style/App.css'
import AddLabelField from "./AddLabelField";


const {textFormStyle, textFieldStyle} = addMenuStyle

export default function LabelAddMenu(props) {

  const [name, setName] = useState(props.name);
  const [color, setColor] = useState(props.color);
  const [labels, setLabels] = useState(props.labels)

  const dispatch = useDispatch();
  const labelIds = useSelector(selectPossibleSubLabels(props.id));

  const handleNameChange = e => setName(e.target.value);
  const handleColorChange = e => setColor(e.target.value);
  const handleLabelSelect = (label, add) => {
    const labelId = label.id;
    const newLabels = labels.filter(label => label.id !== labelId);
    if (add === true) {
      setLabels([...newLabels, label]);
    } else {
      setLabels(newLabels);
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
      }
    ));}

    setName('');
    setColor('');
    props.toggleOpen();
  };

  const selectLabelFields = labelIds.map(id => {
    if (props.id !== id) {
      const selected = labels.filter(label => label.id === id).length !== 0;
      return <AddLabelField key={id} id={id} isSelected={selected} handleLabelSelect={handleLabelSelect}/>
    }
    return null;
  });

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
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-field" style={textFormStyle}>
          <textarea id="color"
                    className="materialize-textarea"
                    value={color}
                    onChange={handleColorChange}
                    style={textFieldStyle}/>
          <label htmlFor="color">Color</label>
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
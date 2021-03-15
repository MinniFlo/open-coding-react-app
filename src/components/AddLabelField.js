import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectLabelById} from "../features/labelsSlice";
import {addMenuStyle, spacing} from "../style/style";


const {labelItemActiveStyle, labelItemStyle} = addMenuStyle

export default function AddLabelField(props) {
  const {id, isSelected, handleLabelSelect} = props;

  const [selected, setSelected] = useState(isSelected);

  const label = useSelector(state => selectLabelById(state, id));
  let colorStyle = {
    padding: spacing["2"],
    borderRadius: 2,
    backgroundColor: label.color,
    margin: spacing["2"],
  };

  const handleOnClick = () => {
    setSelected(!selected);
  }

  useEffect(() => {
    handleLabelSelect(label, selected);
  }, [selected]);

  return (
    <div
      className="valign-wrapper"
      id={label.id}
      onClick={handleOnClick}
      style={selected ? labelItemActiveStyle : labelItemStyle}
    >
      <div style={colorStyle}/>
      <span className="truncate">{label.name}</span>
    </div>
  );
}
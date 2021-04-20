import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectLabelById} from "../features/labelsSlice";
import '../style/App.css'


export default function AddLabelField(props) {
  const {id, isSelected, handleLabelSelect} = props;

  const [selected, setSelected] = useState(isSelected);

  const label = useSelector(state => selectLabelById(state, id));

  const handleOnClick = () => {
    setSelected(!selected);
  }

  useEffect(() => {
    handleLabelSelect(id, selected);
  // eslint-disable-next-line
  }, [selected]);

  return (
    <div
      className={selected ? "labelGridItem active valign-wrapper" : "labelGridItem valign-wrapper"}
      id={label.id}
      onClick={handleOnClick}
    >
      <div className="labelColorIcon" style={{backgroundColor: label.color}}/>
      <span className="truncate">{label.name}</span>
    </div>
  );
}
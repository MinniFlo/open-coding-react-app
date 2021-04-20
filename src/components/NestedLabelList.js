import React from "react";
import LabelListItem from "./LabelListItem";
import {useSelector} from "react-redux";
import {selectLabelsById} from "../features/labelsSlice";


export default function NestedLabelList({labelIds, indent}) {

  const labels = useSelector(selectLabelsById(labelIds));
  const createNestedList = (label) => {
    if (label.labels.length !== 0) {
      return (
        <NestedLabelList key={label.id + "-sub"} labelIds={label.labels} indent={indent + 1}/>
      );
    }
    return null;
  }

  const listElements = labels.map(label => {
    const nestedList = createNestedList(label);
    return (
      <div key={label.id}>
        <LabelListItem key={label.id} id={label.id} indent={indent}/>
        {nestedList && nestedList}
      </div>
    );
  }
  );

  return(
    <ul>
      {listElements}
    </ul>
  );
}
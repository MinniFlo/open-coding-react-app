import React from "react";
import LabelListItem from "./LabelListItem";
import {useSelector} from "react-redux";


export default function NestedLabelList({labelIds, indent}) {

  const labels = useSelector((state) => labelIds.map(id => state.labels.entities[id]))
  const createNestedList = (label) => {
    if (label.labels.length !== 0) {
      const nestedLabelIds = label.labels.map(subLabel => subLabel.id);
      return (
        <NestedLabelList key={label.id + "-sub"} labelIds={nestedLabelIds} indent={indent + 1}/>
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
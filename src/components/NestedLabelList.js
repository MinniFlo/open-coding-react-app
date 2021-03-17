import React from "react";
import TagListItem from "./TagListItem";


export default function NestedLabelList({labelIds}) {

  const listElements = labelIds.map(id =>
      <TagListItem key={id} id={id}/>
  );

  return(
    <ul>
      {listElements}
    </ul>
  );
}
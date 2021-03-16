import React from "react";

import {useSelector} from "react-redux";
import {selectLabelIds} from "../features/labelsSlice";
import TagListItem from "./TagListItem";
import '../style/App.css'



export default function SideBar() {

  const labelIds = useSelector(selectLabelIds);

  const listElements = labelIds.map(labelId =>
    <TagListItem key={labelId} id={labelId}/>
  );
  return (
    <div id="sideBar"  className="sideBar">
      <ul>
        {listElements}
      </ul>
    </div>
  );
}
import React from "react";
import {colors} from "../style/style";
import {sideBarStyle} from "../style/style";
import "../style/App.css"
import {useSelector} from "react-redux";
import {selectLabelIds} from "../features/labelsSlice";
import TagListItem from "./TagListItem";

const {backgroundStyle, liStyle} = sideBarStyle;

export default function SideBar() {

  const labelIds = useSelector(selectLabelIds);

  const listElements = labelIds.map(labelId =>
    <TagListItem key={labelId} id={labelId} style={liStyle}/>
  );
  return (
    <div className={colors.background + colors.text + " z-depth-2"} style={backgroundStyle}>
      <ul>
        {listElements}
      </ul>
    </div>
  );
}
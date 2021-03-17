import React from "react";
import NestedLabelList from "./NestedLabelList";
import '../style/App.css'
import {selectLabelIds} from "../features/labelsSlice";
import {useSelector} from "react-redux";



export default function SideBar() {

  const labelIds = useSelector(selectLabelIds).filter();



  return (
    <div id="sideBar"  className="sideBar">
      <ul>
        <NestedLabelList labelIds={labelIds}/>
      </ul>
    </div>
  );
}
import React from "react";
import NestedLabelList from "./NestedLabelList";
import '../style/App.css'
import { selectParentLabelIds } from "../features/labelsSlice";
import {useSelector} from "react-redux";



export default function SideBar() {

  const labelIds = useSelector(selectParentLabelIds)

  return (
    <div id="sideBar"  className="sideBar" >
        <NestedLabelList labelIds={labelIds} indent={0}/>
    </div>
  );
}
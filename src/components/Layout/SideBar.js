import React from "react";
import {colors} from "../../style/style";
import {sideBarStyle} from "../../style/style";
import "../../style/App.css"

const {backgroundStyle, liStyle} = sideBarStyle;

export default function SideBar(props) {

  const labels = props.labels.map((labelObj) => {
    const colorStyle = {padding: "8px", marginRight: "4px", borderRadius: 2, backgroundColor: labelObj.color};
    return (
      <li className="row valign-wrapper" key={labelObj.name} style={liStyle}>
        <div className="col s1" style={colorStyle}/>
        <span className="col s11 truncate">{labelObj.name}</span>
      </li>
    );
  });

  return (
    <div className={colors.background + colors.text + " z-depth-2"} style={backgroundStyle}>
      <ul>
        {labels}
      </ul>
    </div>
  );
}
import React from "react";
import {colors} from "../../style/style";
import {sideBarStyle} from "../../style/style";
import "../../style/App.css"

const {backgroundStyle, liStyle} = sideBarStyle;

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);

    this.labels = props.labels.map((labelObj) =>
      <li className="row valign-wrapper" key={labelObj.name} style={liStyle}>
        <div className="col s1" style={{backgroundColor: labelObj.color, padding:"8px", marginRight: "4px", borderRadius:2}} />
        <span className="col s11">{labelObj.name}</span>
      </li>
    );
  }

  render() {
    return (
      <div className={colors.background + colors.text + " z-depth-2"} style={backgroundStyle}>
        <ul>
          {this.labels}
        </ul>
      </div>
    );
  }

}
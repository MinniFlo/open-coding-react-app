import React from "react";
import {uiSpacing, colors} from "../../style/style";

const sideBarStyle = {
  width: uiSpacing.sideBarWidth,
  paddingTop: uiSpacing.topBarHeight,
  height: "100%",
  position: "fixed",
  top: 0,
  zIndex: 2,
}

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={colors.background + colors.text + " z-depth-2"} style={sideBarStyle}>

      </div>
    );
  }

}
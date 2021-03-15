import React, {useEffect} from "react";
import M from "materialize-css";
import {uiSpacing, colors} from "../style/style";

const headerStyle = {
  lineHeight: uiSpacing.topBarHeight,
  height: uiSpacing.topBarHeight,
  zIndex: 3,
}

export default function Header(props) {


  useEffect(() => {
    let dropdowns = document.querySelectorAll('.dropdown-trigger');

    let options = {
      inDuration: 300,
      outDuration: 300,
      hover: false,
      coverTrigger: false,
    };

    M.Dropdown.init(dropdowns, options);
  });

  const listButtonStyle = {
    textTransform: "none"
  }


  return (
    <>
      <div className="navbar-fixed">
        <nav className={colors.background + colors.text} style={headerStyle}>
          <div className="nav-wrapper row">
            <div className="col s4">
              <button className={"btn-flat dropdown-trigger" + colors.text} style={listButtonStyle} data-target="dropdown1">File</button>
            </div>
            <div className="col s4 truncate" style={{textAlign:"center"}}><span>{props.currentfile}</span></div>
            <div className="col s4" style={{textAlign: "right"}}><span>100%</span></div>
          </div>
        </nav>
      </div>

      {/*dropdown structure*/}
      <ul id="dropdown1" className={"dropdown-content" + colors.background + colors.text} style={{width: "50px"}}>
        <li className="valign-wrapper"><button className="btn-flat" style={listButtonStyle}>import</button></li>
        <li className="valign-wrapper"><button className="btn-flat" style={listButtonStyle}>open</button></li>
        <li className="valign-wrapper"><button className="btn-flat" style={listButtonStyle}>save</button></li>
        <li className="valign-wrapper"><button className="btn-flat" style={listButtonStyle}>save as</button></li>
        <li className="valign-wrapper"><button className="btn-flat" style={listButtonStyle}>export</button></li>
      </ul>
    </>
  );
}
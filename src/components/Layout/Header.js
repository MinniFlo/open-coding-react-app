import React, {useEffect} from "react";
import M from "materialize-css";
import {uiSpacing, colors} from "../../style/style";

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


  return (
    <>
      <div className="navbar-fixed">
        <nav className={colors.background + colors.text} style={headerStyle}>
          <div className="nav-wrapper row">
            <div className="col s4">
              <a className={"dropdown-trigger" + colors.text} style={{padding:"16px"}} href="#" data-target="dropdown1">File</a>
            </div>
            <div className="col s4 truncate" style={{textAlign:"center"}}><span>{props.currentfile}</span></div>
            <div className="col s4" style={{textAlign: "right"}}><span>100%</span></div>
          </div>
        </nav>
      </div>

      {/*dropdown structure*/}
      <ul id="dropdown1" className={"dropdown-content" + colors.background} style={{width: "50px"}}>
        <li><a className={colors.text} href="#">import</a></li>
        <li><a className={colors.text} href="#">open</a></li>
        <li><a className={colors.text} href="#">save</a></li>
        <li><a className={colors.text} href="#">save as</a></li>
        <li><a className={colors.text} href="#">export</a></li>
      </ul>
    </>
  );
}
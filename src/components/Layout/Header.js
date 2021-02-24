import React from "react";
import M from "materialize-css";
import {uiSpacing, colors} from "../../style/style";

const headerStyle = {
  lineHeight: uiSpacing.topBarHeight,
  height: uiSpacing.topBarHeight,

}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let dropdowns = document.querySelectorAll('.dropdown-trigger');

    let options = {
      inDuration: 300,
      outDuration: 300,
      hover: false,
      coverTrigger: false,
    };

    M.Dropdown.init(dropdowns, options);
  }

  render() {
    return (
      <>
        <div className="navbar-fixed">
          <nav className={colors.background + colors.text} style={headerStyle}>
            <div className="nav-wrapper row">
              <div className="col s4">
                <a className={"dropdown-trigger" + colors.text} style={{padding:"16px"}} href="#" data-target="dropdown1">File</a>
              </div>
              <div className="col s4" style={{textAlign:"center"}}><span>unknwon-document</span></div>
              <div className="col s4" style={{textAlign: "right"}}><span>100%</span></div>
            </div>
          </nav>
        </div>

        {/*dropdown structure*/}
        <ul id="dropdown1" className={"dropdown-content" + colors.background} style={{width: "50px"}}>
          <li><a className={colors.text} href="#">one</a></li>
          <li><a className={colors.text} href="#">two</a></li>
          <li><a className={colors.text} href="#">three</a></li>
        </ul>
      </>
    );
  }

}
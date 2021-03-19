import React, {useEffect} from "react";
import M from "materialize-css";
import '../style/App.css'
import LoadFileButton from "./LoadFileButton";
import ImportFileButton from "./ImportFileButton";
import SaveFileButton from "./SaveFileButton";


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
        <nav className="header">
          <div className="nav-wrapper row">
            <div className="col s4">
              <button className="btn-flat dropdown-trigger" style={{textTransform: "none"}} data-target="fileDropdown">File</button>
            </div>
            <div className="col s4 truncate" style={{textAlign:"center"}}><span>{props.currentfile}</span></div>
            <div className="col s4" style={{textAlign: "right"}}><span>100%</span></div>
          </div>
        </nav>
      </div>

      {/*dropdown structure*/}
      <ul id="fileDropdown" className="dropdown-content" style={{width: "50px"}}>
        <li className="valign-wrapper"><ImportFileButton/></li>
        <li className="valign-wrapper"><LoadFileButton/></li>
        <li className="valign-wrapper"><SaveFileButton/></li>
        {/*<li className="valign-wrapper"><button className="btn-flat" style={{textTransform: "none"}}>save as</button></li>*/}
        {/*<li className="valign-wrapper"><button className="btn-flat" style={{textTransform: "none"}}>export</button></li>*/}
      </ul>
    </>
  );
}
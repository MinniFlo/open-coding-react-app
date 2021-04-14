import React, {useState} from "react";
import '../style/App.css'
import LoadFileButton from "./LoadFileButton";
import ImportFileButton from "./ImportFileButton";
import SaveFileButton from "./SaveFileButton";
import {useSelector} from "react-redux";


export default function Header(props) {

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const scale = useSelector(state => state.navigation.scale);

  const toggleDrop = () => {
    setDropDownOpen(!dropDownOpen);
  }

  return (
    <>
      <div className="navbar-fixed" style={{zIndex: 4}}>
        <nav className="header">
          <div className="nav-wrapper row">
            <div className="col s4">
              {/*<button className="btn-flat dropdown-trigger" style={{textTransform: "none"}} data-target="fileDropdown">File</button>*/}
              <button
                className="btn-flat dropdown-trigger"
                style={{textTransform: "none"}}
                onClick={toggleDrop}>File</button>
            </div>
            <div className="col s4 truncate" style={{textAlign:"center"}}><span>{props.currentfile}</span></div>
            <div className="col s4" style={{textAlign: "right"}}><span>{Math.floor(100*scale + 0.5) + '%'}</span></div>
          </div>
        </nav>
      </div>

      {dropDownOpen &&
        <div>
          <ul className="dropDown">
            <li><ImportFileButton toggleDrop={toggleDrop} getImportData={props.getImportData}/></li>
            <li><LoadFileButton toggleDrop={toggleDrop}/></li>
            <li><SaveFileButton toggleDrop={toggleDrop}/></li>
            {/*<li className="valign-wrapper"><button className="btn-flat" style={{textTransform: "none"}}>save as</button></li>*/}
            {/*<li className="valign-wrapper"><button className="btn-flat" style={{textTransform: "none"}}>export</button></li>*/}
          </ul>
        </div>
      }



    </>
  );
}
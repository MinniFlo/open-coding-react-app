import React, {useState} from "react";
import '../style/App.css';
import Workspace from "./Workspace";
import Header from "./Header";
import SideBar from "./SideBar";
import AddMenu from "./AddMenu";
import ImportMenu from "./ImportMenu";


function App(props){

  const [importOpen, setImportOpen] = useState(false)

  return (
    <div className="App">
      <Header currentfile="unknown-document"/>
      <SideBar />
      <AddMenu />
      <Workspace />
      {importOpen && ImportMenu}
    </div>
  );
}

export default App;

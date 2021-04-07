import React, {useState} from "react";
import '../style/App.css';
import Workspace from "./Workspace";
import Header from "./Header";
import SideBar from "./SideBar";
import AddMenu from "./AddMenu";
import ImportMenu from "./ImportMenu";



function App(props){

  // import menu state and functions
  const [importOpen, setImportOpen] = useState(false);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("unknown-file");

  const handleSetImportOpen = (boolean) => {
    setImportOpen(boolean)
  }

  const getImportData = (data, fileName) => {
    setData(data);
    setFileName(fileName);
    setImportOpen(true);
  }

  // // popup state and functions
  // const [popUpOpen, setPopUpOpen] = useState(false);
  // const [popUpText, setPopUpText] = useState("Is this an example?");
  // const [yesFunc, setYesFunc] = useState(null);
  // const [noFunc, setNoFunc] = useState(null);
  // const [popUp, setPopUp] = useState(null);
  //
  // const handleSetPopUpOpen = (boolean) => {
  //   setPopUpOpen(boolean);
  // }
  //
  // const createPopUp = (text, yesFunc, noFunc) => {
  //   const popUp = <PopUp text={text} onYes={yesFunc} onNo={noFunc}/>;
  //   setPopUp(popUp);
  // }

  return (
    <div className="App">
      {/*{popUpOpen && popUp}*/}
      <Header currentfile="unknown-document" getImportData={getImportData} />
      <SideBar />
      <AddMenu />
      <Workspace />
      {importOpen && <ImportMenu setImportOpen={handleSetImportOpen} data={data} fileName={fileName}/>}
    </div>
  );
}

export default App;

import React, {useState} from "react";
import '../style/App.css';
import Workspace from "./Workspace";
import Header from "./Header";
import SideBar from "./SideBar";
import AddMenu from "./AddMenu";
import ImportMenu from "./ImportMenu";


function App(props){

  const [importOpen, setImportOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleSetImportOpen = (boolean) => {
    setImportOpen(boolean)
  }

  const getImportData = (data) => {
    setData(data);
    console.log(data);
    setImportOpen(true);
  }

  return (
    <div className="App">
      <Header currentfile="unknown-document" getImportData={getImportData}/>
      <SideBar />
      <AddMenu />
      <Workspace />
      {importOpen && <ImportMenu setImportOpen={handleSetImportOpen} data={data}/>}
    </div>
  );
}

export default App;

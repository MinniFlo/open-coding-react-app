import React from "react";
import '../style/App.css';
import Workspace from "./Workspace";
import Header from "./Header";
import SideBar from "./SideBar";
import AddMenu from "./AddMenu";


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      fileName: "unknown-document",
      zoom: 1
    };
  }

  render() {
    return (
      <div className="App">
        <Header currentfile={this.state.fileName} persistor={this.props.persistor}/>
        <SideBar />
        <AddMenu />
        <Workspace />
      </div>
    );
  }
}

export default App;

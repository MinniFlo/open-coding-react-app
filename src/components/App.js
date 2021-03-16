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

    // this.handleData = this.handleData.bind(this);
  }

  // converts Data from DataImporter into Array and calls function createNotes
  // handleData(e) {
  //   const data = e.target.result.split('\n');
  //   console.log(data);
  //   this.createNotes(data);
  // }
  //
  // // creates all Note Components and writes it to state
  // createNotes(contentList) {
  //   const notesList = contentList.map((content) =>
  //     <Note key={content} content = {content} />
  //   );
  //   this.setState({notes: notesList});
  // }


  render() {
    return (
      <div className="App">
        <Header currentfile={this.state.fileName}/>
        <SideBar />
        <AddMenu />
        <Workspace />
      </div>
    );
  }
}

export default App;

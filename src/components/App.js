import React from "react";
import '../style/App.css';
import {Workspace} from "./Layout"
import Header from "./Layout/Header";
import SideBar from "./Layout/SideBar";

const testLabels = [{name: "Elefant", color: "#a55"},
                    {name: "Tiger", color: "#55a"},
                    {name: "Ente", color: "#5a5"},];

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      labels: testLabels,
      fileName: "current-file",
      zoom: 1
    };

    // this.handleData = this.handleData.bind(this);
    this.newNote = this.newNote.bind(this);
    this.newLabel = this.newLabel();
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

  // creates a single new Note
  newNote(content="", lables=[], comment="", x=0, y=0) {
    const noteData = {content: content, labels: lables, comment: comment, x: x, y: y};
    const noteList = this.state.notes.concat(noteData);
    this.setState({notes: noteList});
  }

  newLabel(name="", color="#b55") {
    const labelData = {name: name, color: color};
    const labelList = this.state.labels.concat(labelData)
    this.setState({labels: labelList});
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SideBar labels={this.state.labels}/>
        <Workspace notes={this.state.notes} labels={this.state.labels} newNote={this.newNote}/>
      </div>
    );
  }
}

export default App;

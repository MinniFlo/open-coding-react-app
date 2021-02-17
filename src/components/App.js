import React from "react";
import '../style/App.css';
import {Workspace, DataImporter, Note, CreateNoteButton} from "./Layout"

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };

    this.handleData = this.handleData.bind(this);
    this.createSingleNote = this.createSingleNote.bind(this);
  }

  // converts Data from DataImporter into Array and calls function createNotes
  handleData(e) {
    const data = e.target.result.split('\n');
    console.log(data);
    this.createNotes(data);
  }

  // creates all Note Components and writes it to state
  createNotes(contentList) {
    const notesList = contentList.map((content) =>
      <Note key={content} content = {content} />
    );
    this.setState({notes: notesList});
  }

  // creates a single new Note
  createSingleNote(content) {
    console.log("note created: " + content);
    const note = <Note key={content} content={content} />;
    const newList = this.state.notes;
    newList.push(note);
    this.setState((state) => ({notes: newList}));
    console.log(this.state.notes);
  }

  render() {
    return (
      <div className="App">
        <div className='topBar'>
          <DataImporter handleData={this.handleData}/>
          <CreateNoteButton createSingleNote={this.createSingleNote}/>
        </div>
        <Workspace notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;

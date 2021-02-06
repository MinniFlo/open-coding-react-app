import React from "react";
import './style/App.css';
import Workspace from './components/Workspace';
import DataImporter from './components/DataImporter'
import Note from './components/Note';
import NewNote from './components/NewNote'

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
    const note = <Note content = {content} />;
    this.setState((state) => ({notes: state.notes.push(note)}));
  }

  render() {
    return (
      <div className="App">
        <div className='topBar'>
          <DataImporter handleFunction={this.handleData}/>
          <NewNote createSingleNote = {this.createSingleNote}/>
        </div>
        <Workspace notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;

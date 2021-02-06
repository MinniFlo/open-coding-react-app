import './style/App.css';
import Workspace from './components/Workspace';
import DataImporter from './components/DataImporter'
import React from "react";
import Note from "./components/Note";


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.handleData = this.handleData.bind(this);
  }

  // converts Data from DataImporter into Array and calls function createNotes
  handleData(e) {
    const data = e.target.result.split('\n');
    console.log(data);
    this.createNotes(data);
  }

  // creates all Note Components and writes it to state
  createNotes(textList) {
    const notesList = textList.map((text) =>
      <Note key={text} content = {text} />
    );
    this.setState({notes: notesList})
  }

  render() {
    return (
      <div className="App">
        <div className='topBar'>
          <DataImporter handleFunction={this.handleData}/>
        </div>
        <Workspace notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;

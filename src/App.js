import './style/App.css';
import Workspace from './components/Workspace';
import React from "react";


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      notes: ['A', 'List', 'of', 'words']
    };

    this.fileInput = React.createRef();

    this.showFile = this.showFile.bind(this);
  }

  handleData = (e) => {
    const data = e.target.result.split('\n');
    console.log(data);
    this.setState({notes: data});
  }

  showFile() {
    let file = this.fileInput.current.files[0];
    let reader = new FileReader();

    reader.onloadend = this.handleData;

    reader.readAsText(file);
  }



  render() {
    return (
      <div className="App">
        <div className='topBar'>
          <input type='file' ref={this.fileInput} onChange={this.showFile} />
        </div>
        <Workspace notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;

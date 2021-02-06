import React from 'react';

export default class DataImporter extends React.Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.readFile = this.readFile.bind(this);
    this.handleFunction = props.handleFunction;
  }

  // reads Data from File and calls the handleFunction from the App Component
  readFile() {
    let file = this.fileInput.current.files[0];
    let reader = new FileReader();

    reader.onloadend = this.handleFunction;

    reader.readAsText(file);
  }

  render() {
    return (
      <input type='file' ref={this.fileInput} onChange={this.readFile} />
      );
  }
}
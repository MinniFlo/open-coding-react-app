import React from "react";
import '../style/App.css'
import AddButton from "./Layout/AddButton";
import {colors, addMenuStyle} from "../style/style";


const {backgroundStyle, textFieldStyle, elementStyle} = addMenuStyle

export default class NoteCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      content: '',
    }

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  toggleOpen() {
    this.setState({open: !this.state.open});
  }

  handleChange(e) {
    this.setState({content: e.target.value});
  }

  onSubmit() {
    console.log('submit!');
    this.toggleOpen();
    this.props.createSingleNote(this.state.content);
  }

  render() {
    return (
      <>
        {this.state.open ?
          <div className={"card " + colors.background + colors.text} style={backgroundStyle}>
            <h6 style={elementStyle}>Notizzettel erstellen</h6>
            <form onSubmit={this.onSubmit}>
              <div className="input-field" style={textFieldStyle}>
                <textarea id="content" onChange={this.handleChange} className="materialize-textarea"/>
                <label htmlFor="content">Content</label>
              </div>
              <button className="btn waves-effect waves-light" style={elementStyle} type='submit'>
                submit
              </button>
            </form>
          </div>

          :
          <AddButton onClick={this.toggleOpen}/>
        }
      </>
    );
  }
}
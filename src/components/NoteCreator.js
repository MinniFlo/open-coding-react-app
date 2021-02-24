import React from "react";
import '../style/App.css'
import AddButton from "./Layout/AddButton";
import {colors, spacing} from "../style/style";


const menuStyle = {
  margin: spacing["3"],
  paddingTop: spacing["3"],
  width: "300px",
  position: "fixed",
}

const textFieldStyle = {
  margin: spacing["2"],
  color: "#333"
}

const buttonStyle = {
  margin: spacing["2"],
}

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
          <div className={"card " + colors.background + colors.text} style={menuStyle}>
            <h6 style={buttonStyle}>Notizzettel erstellen</h6>
            <form onSubmit={this.onSubmit}>
              <div className="input-field" style={textFieldStyle}>
                <textarea id="content" className="materialize-textarea"/>
                <label htmlFor="content">Content</label>
              </div>
              <button className="btn waves-effect waves-light" style={buttonStyle} type='submit'>
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
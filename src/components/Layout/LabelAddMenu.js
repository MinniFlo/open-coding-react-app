import React from "react";
import {addMenuStyle} from "../../style/style";

const {textFieldStyle, elementStyle} = addMenuStyle

export default class LabelAddMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: '',
    }

    this.toggleOpen = props.toggleOpen
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }

  onSubmit() {
    this.toggleOpen();
    this.props.createSingleNote(this.state.content);
  }

  render() {
    return (
      <div id="label col s12">
        <form onSubmit={this.onSubmit}>
          <div className="input-field" style={textFieldStyle}>
            <textarea id="name" onChange={this.handleChange} className="materialize-textarea"/>
            <label htmlFor="name">Name</label>
          </div>
          <button className="btn waves-effect waves-light" style={elementStyle} type='submit'>
            submit
          </button>
        </form>
      </div>
    );
  }
}
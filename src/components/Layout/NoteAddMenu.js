import React from "react";
import {addMenuStyle} from "../../style/style";

const {textFieldStyle, elementStyle} = addMenuStyle

export default class NoteAddMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      labels: [],
      comment: '',
    }

    this.toggleOpen = props.toggleOpen;
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  handleCommentChange(e) {
    this.setState({comment: e.target.value})
  }

  onSubmit() {
    this.toggleOpen();
    this.props.newNote(this.state.content,this.state.labels ,this.state.comment);
  }

  render() {
    return (
      <div id="note col s12">
        <form onSubmit={this.onSubmit}>
          <div className="input-field" style={textFieldStyle}>
            <textarea id="content" onChange={this.handleContentChange} className="materialize-textarea"/>
            <label htmlFor="content">Content</label>
          </div>
          <div className="input-field" style={textFieldStyle}>
            <textarea id="comment" onChange={this.handleCommentChange} className="materialize-textarea"/>
            <label htmlFor="comment">Comment</label>
          </div>
          <button className="btn waves-effect waves-light" style={elementStyle} type='submit'>
            submit
          </button>
        </form>
      </div>
      );
  }
}
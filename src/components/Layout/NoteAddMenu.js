import React from "react";
import {addMenuStyle} from "../../style/style";

const {textFormStyle, textFieldStyle, elementStyle} = addMenuStyle

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
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  handleCommentChange(e) {
    this.setState({comment: e.target.value})
  }

  handleLabelChange(e) {
    console.log(e.target);
  }

  onSubmit() {
    this.toggleOpen();
    this.props.newNote(this.state.content,this.state.labels ,this.state.comment);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="input-field" style={textFormStyle}>
            <textarea id="content" onChange={this.handleContentChange} className="materialize-textarea" style={textFieldStyle}/>
            <label htmlFor="content">Content</label>
          </div>
          <div>
            <div className="row  truncate" onChange={this.handleLabelChange}>
              <label className="col s6">
                <input id="le name" type="checkbox" className="filled-in"/>
                <span>le name</span>
              </label>
              <label className="col s6 grey-text text-darken-4">
                <input id="se veri long name" type="checkbox" className="filled-in"/>
                <span>wefwefwef</span>
              </label>
            </div>
          </div>
          <div className="input-field" style={textFormStyle}>
            <textarea id="comment" onChange={this.handleCommentChange} className="materialize-textarea" style={textFieldStyle}/>
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
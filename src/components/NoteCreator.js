import React from "react";
import '../style/App.css'
import CreateNoteButton from "./Layout/CreateNoteButton"
import StyledTextField from "./Layout/StyledTextField";
import StyledButton from "./Layout/StyledButton";
import StyledPaper from "./Layout/StyledPaper"


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
          <StyledPaper>
            <form onSubmit={this.onSubmit}>
              <StyledTextField
                label="Content"
                rows={5}
                value={this.state.content}
                onChange={this.handleChange}
              />
              <StyledButton type='submit' value='submit'>
              </StyledButton>
            </form>
          </StyledPaper>

          :
          <CreateNoteButton toggleOpen={this.toggleOpen}/>
        }
      </>
    );
  }
}
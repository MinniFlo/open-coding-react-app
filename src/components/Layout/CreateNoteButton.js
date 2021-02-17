import React from "react";
import '../../style/App.css'
import Button from '@material-ui/core/Button'

export default class CreateNoteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      content: ''
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
          <div className='Dim'>
            <form onSubmit={this.onSubmit}>
              <label>
                Content:
                <input type='text' value={this.state.content} onChange={this.handleChange}/>
              </label>
              <input type='submit' value='create'/>
            </form>
          </div>
          :
          <Button variant='contained' onClick={this.toggleOpen}>new Note</Button>
        }
      </>
    );
  }

}
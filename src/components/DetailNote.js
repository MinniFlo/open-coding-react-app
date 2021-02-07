import React from "react";
import '../style/App.css'

export default class DetailNote extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      content: props.content
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleDetail();
  }

  render() {
    return (
      <div className='Dim' onClick={this.handleClick}>
        <div className='DetailNote'>
          <p>{this.state.content}</p>
        </div>
      </div>
    );
  }
}
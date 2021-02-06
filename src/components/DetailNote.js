import React from "react";
import '../style/App.css'

export default class DetailNote extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      content: props.content
    }

    this.toggleDetail = props.toggleDetail;
  }

  render() {
    return (
      <div className='DetailNote'>
        <button onClick={this.toggleDetail}>close</button>
        <p>{this.state.content}</p>
      </div>
    );
  }
}
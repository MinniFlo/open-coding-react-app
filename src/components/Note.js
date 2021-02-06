import React from "react";
import '../style/App.css'
import Draggable from 'react-draggable'

export default class Note extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      content: props.content
    }
  }

  render() {
    return (
      <Draggable>
        <div className='Note'>{this.state.content}</div>
      </Draggable>
    );
  }
}
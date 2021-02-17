import React from "react";
import '../../style/App.css'
import Draggable from 'react-draggable'
import DetailNote from "./DetailNote";

export default class Note extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      content: props.content,
      detail: false
    }

    this.toggleDetail = this.toggleDetail.bind(this)
  }

  toggleDetail() {
    this.setState({detail: !this.state.detail});
  }

  render() {
    return (
      <>
        {this.state.detail ? <DetailNote content={this.state.content} toggleDetail={this.toggleDetail} /> :
          <Draggable>
            <div className='Note'>
              <button onClick={this.toggleDetail}>detail</button>
              <p>{this.state.content}</p>
            </div>
          </Draggable>
        }
      </>
    );
  }
}
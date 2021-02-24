import React from "react";
import '../../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable'
import {colors, spacing} from "../../style/style";

const noteStyle = {
  height: "120px",
  width: "170px",
  margin: spacing["2"],
  zIndex: 0,
}

export default class Note extends React.Component {

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
        {this.state.detail ? <DetailNote content={this.state.content} toggleDetail={this.toggleDetail}/> :
          <Draggable>
            <div className={"card" + colors.background + colors.text} style={noteStyle}>
              <p>{this.state.content}</p>
            </div>
          </Draggable>
        }
      </>
    );
  }
}
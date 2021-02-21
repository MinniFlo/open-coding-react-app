import React from "react";
import '../../style/App.css'
import Draggable from 'react-draggable'
import DetailNote from "./DetailNote";
import NoteObj from "./NoteObj";


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
          // <Draggable>
          //   <NotePaper>
          //     <IconButton onClick={this.toggleDetail}>
          //       <MoreHoriz />
          //     </IconButton>
          //     <p>{this.state.content}</p>
          //   </NotePaper>
          // </Draggable>
          <Draggable>
            <NoteObj content={this.state.content}/>
          </Draggable>
        }
      </>
    );
  }
}
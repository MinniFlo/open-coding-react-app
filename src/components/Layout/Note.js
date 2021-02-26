import React from "react";
import '../../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable'
import {colors, spacing, uiSpacing} from "../../style/style";
import {MoreHoriz} from "@material-ui/icons";

const noteStyle = {
  minHeight: uiSpacing.noteMinHeight,
  maxHeight: uiSpacing.noteMaxHeight,
  width: uiSpacing.noteWidth,
  margin: 0,
  zIndex: 0,
  overflow: "hidden",
  cursor: "pointer",
}

const contentStyle = {
  margin: 0,
  fontSize: 12,
  padding: spacing["2"],
  paddingTop: spacing["4"],
  lineHeight: "15px",
}

const iconStyle = {
  margin: spacing["1"],
}

const tagUlStyle = {
  margin: 0,
  marginLeft: spacing["2"],
}

const tagLiStyle = {
  display: "inline-block",
  listStyleType: "none",
  marginRight: spacing["2"],
}

const tagStyle = {
  height: spacing["4"],
  width: spacing["4"],
  padding: 0,
  margin: 0,
  borderRadius: 1,
  boxShadow: "0 1px 2px rgba(20, 20, 20, 0.5)",
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
            <div style={{width:uiSpacing.noteWidth}}>
              <div className={"card" + colors.background + colors.text} style={noteStyle}>
                <MoreHoriz
                  className="right"
                  style={iconStyle}
                  onClick={this.toggleDetail}
                />
                <p style={contentStyle}>{this.state.content}</p>
              </div>
              <ul style={tagUlStyle}>
                <li style={tagLiStyle}><div className="green lighten-2" style={tagStyle}/></li>
                <li style={tagLiStyle}><div className="red lighten-2" style={tagStyle}/></li>
                <li style={tagLiStyle}><div className="blue lighten-2" style={tagStyle}/></li>
              </ul>
            </div>
          </Draggable>
        }
      </>
    );
  }
}
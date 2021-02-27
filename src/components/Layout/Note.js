import React from "react";
import '../../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable'
import {colors, spacing} from "../../style/style";
import {MoreHoriz} from "@material-ui/icons";
import {noteStyle} from "../../style/style";


const {elementStyle, backgroundStyle, contentStyle, iconStyle, tagLiStyle, tagUlStyle} = noteStyle;

export default class Note extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      detail: false
    }

    this.labels = this.labels = props.labels.map((labelObj) => {
      const tagStyle = {
        height: spacing["4"],
        width: spacing["4"],
        padding: 0,
        margin: 0,
        borderRadius: 1,
        boxShadow: "0 1px 2px rgba(20, 20, 20, 0.5)",
        backgroundColor: labelObj.color};
      return (
        <li key={labelObj.name} style={tagLiStyle}>
          <div style={tagStyle}/>
        </li>
      );
    });

    this.toggleDetail = this.toggleDetail.bind(this)
  }

  toggleDetail() {
    this.setState({detail: !this.state.detail});
  }

  render() {
    return (
      <>
        {this.state.detail ? <DetailNote content={this.props.content} comment={this.props.comment} toggleDetail={this.toggleDetail}/> :
          <Draggable>
            <div style={elementStyle}>
              <div className={"card" + colors.background + colors.text} style={backgroundStyle}>
                <MoreHoriz
                  className="right"
                  style={iconStyle}
                  onClick={this.toggleDetail}
                />
                <p style={contentStyle}>{this.props.content}</p>
              </div>
              <ul style={tagUlStyle}>
                {this.labels}
              </ul>
            </div>
          </Draggable>
        }
      </>
    );
  }
}
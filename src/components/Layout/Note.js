import React from "react";
import '../../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable'
import {colors} from "../../style/style";
import {MoreHoriz} from "@material-ui/icons";
import {noteStyle} from "../../style/style";


const {elementStyle, backgroundStyle, contentStyle, iconStyle, tagLiStyle, tagStyle, tagUlStyle} = noteStyle;

export default class Note extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
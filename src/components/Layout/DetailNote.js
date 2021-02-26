import React from "react";
import '../../style/App.css'
import {colors, detailStyle} from "../../style/style";


const {backgroundStyle, textStyle, labelStyle} = detailStyle

export default class DetailNote extends React.Component{

  constructor(props) {
    super(props);

    this.state = {

    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleDetail();
  }

  render() {
    return (
      <div className={"card " + colors.background + colors.text} style={backgroundStyle}>
        <span style={labelStyle}>Content:</span>
        <p style={textStyle}>{this.props.content}</p>
        <span style={labelStyle}>Comment:</span>
        <p style={textStyle}>{this.props.comment}</p>
        <button className="btn waves-effect waves-light" onClick={this.handleClick} style={labelStyle}>close</button>
      </div>
    );
  }
}
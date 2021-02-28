import React, {useState} from "react";
import '../../style/App.css'
import DetailNote from "./DetailNote";
import Draggable from 'react-draggable'
import {colors, spacing} from "../../style/style";
import {MoreHoriz} from "@material-ui/icons";
import {noteStyle} from "../../style/style";


const {elementStyle, backgroundStyle, contentStyle, iconStyle, tagLiStyle, tagUlStyle} = noteStyle;

export default function Note(props) {

  const [detail, setDetail] = useState(false);

  const toggleDetail = () => setDetail(!detail);

  const labels  = props.labels.map(labelObj => {
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


  return (
    <>
      {detail ? <DetailNote content={props.content} comment={props.comment} toggleDetail={toggleDetail}/> :
        <Draggable>
          <div style={elementStyle}>
            <div className={"card" + colors.background + colors.text} style={backgroundStyle}>
              <MoreHoriz
                className="right"
                style={iconStyle}
                onClick={toggleDetail}
              />
              <p style={contentStyle}>{props.content}</p>
            </div>
            <ul style={tagUlStyle}>
              {labels}
            </ul>
          </div>
        </Draggable>
      }
    </>
  );
}
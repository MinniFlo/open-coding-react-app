import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {readString} from "react-papaparse";
import { labelAddMany } from "../features/labelsSlice";
import { noteAddMany } from "../features/notesSlice";

export default function LoadFileButton(props) {

  const fileInput = useRef(null);
  const dispatch = useDispatch();

  const onClick = () => {
    fileInput.current.click();
  }

  const handleFile = () => {
    // props.persistor.purge();
    dispatch({type: 'CLEAR_STATE', payload: {}});
    let file = fileInput.current.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => parseData(e.target.result);

    reader.readAsText(file);
  }

  const parseData = data => {
    const dataParseObj = readString(data, {header: true ,skipEmptyLines: true});
    console.log(dataParseObj);
    const dataObj = dataParseObj.data;
    let labels = [];

    let notes = [];
    // create each Note and Label
    dataObj.forEach(obj => {
      switch (obj.meta) {
        case "label": {
          const newLabel = {id: "", name: "", color: "", parentLabelId: "", labels: []};
          newLabel.id = obj.id;
          newLabel.name = obj.content;
          newLabel.color = obj.color;
          labels = [...labels, newLabel];
          break;
        } case "note": {
          const newNote = {id: "", content: "", labels: [], comment: "", position: {x: 0, y: 0}};
          newNote.id = obj.id;
          newNote.content = obj.content;
          newNote.comment = obj.comment;
          const xPos = obj.x === "" ? 0 : parseInt(obj.x);
          const yPos = obj.y === "" ? 0 : parseInt(obj.y);
          newNote.position = {x: xPos, y: yPos};
          notes = [...notes, newNote]
          break;
        } default: {
          console.log("unexpected meta field");
        }
      }
    })
    // distribute Labels
    // const labelIds = labels.map(label => label.id);
    // dataObj.forEach(obj => {
    //   let ids = labelIds.filter(id => obj[id] !== "");
    //   if (ids.length === 0) {
    //     return;
    //   }
    //   ids.map(id => labels.filter(label => id !== label.id)[0]);
    //
    // })

    dispatch(labelAddMany(labels));
    dispatch(noteAddMany(notes));
  }

  return (
    <>
      <button
        className="btn-flat"
        onClick={onClick}
        style={{textTransform: "none"}}
      >open</button>
      <input
        id="file"
        type="file"
        ref={fileInput}
        onChange={handleFile}
        accept=".csv, .xlsx, .ods"
        style={{display: "none"}}/>
    </>

  );
}
import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {readString} from "react-papaparse";
import {labelAddMany} from "../features/labelsSlice";
import {noteAddMany} from "../features/notesSlice";
import {saveStructure} from "../style/style";
import PopUp from "./PopUp";

export default function LoadFileButton(props) {

  const fileInput = useRef(null);
  const dispatch = useDispatch();

  const onClick = () => {
    fileInput.current.click();
  }

  const handleFile = () => {
    let file = fileInput.current.files[0];
    let reader = new FileReader();
    reader.onloadend = (e) => checkFile(file, e.target.result);
    reader.readAsText(file);
  }

  const checkFile = (file, result) => {
    if (file.type === "text/csv") {
      // validates the header structure of the csv-table
      const resultHeader = result.replace(/\n/g, "").split(',', 7);
      let isSaveState = true
      const saveStateStructure = Object.keys(saveStructure)
      resultHeader.forEach((ele) => {
        if (saveStateStructure.indexOf(ele) === -1) {
          isSaveState = false;
        }
      })

      if (isSaveState) {
        //valid header
        dispatch({type: 'CLEAR_STATE', payload: {}});
        parseData(result);
      } else {
        console.log("This File needs to be Imported")
      }

    } else {
      console.log("Invalid file type!");
      props.toggleDrop();
    }
  }

  const parseData = data => {
    const dataParseObj = readString(data, {header: true ,skipEmptyLines: true});
    const dataObj = dataParseObj.data;
    let labels = {};
    let notes = {};
    // create each Note and Label
    dataObj.forEach(obj => {
      switch (obj.meta) {
        case "label": {
          const newLabel = {id: "", name: "", color: "", parentLabelId: "", labels: []};
          newLabel.id = obj.id;
          newLabel.name = obj.content;
          newLabel.color = obj.color;
          labels[newLabel.id] = newLabel;
          break;
        } case "note": {
          const newNote = {id: "", content: "", labels: [], comment: "", position: {x: 0, y: 0}};
          newNote.id = obj.id;
          newNote.content = obj.content;
          newNote.comment = obj.comment;
          const xPos = obj.x === "" ? 0 : parseInt(obj.x);
          const yPos = obj.y === "" ? 0 : parseInt(obj.y);
          newNote.position = {x: xPos, y: yPos};
          notes[obj.id] = newNote
          break;
        } default: {
          console.log("unexpected meta field");
        }
      }
    });

    // set label references
    dataObj.forEach(obj => {
      // get all label ids that are referenced in table row
      const labelIds = Object.keys(labels).filter(id => obj[id] !== "");
      switch (obj.meta) {
        case "label": {
          const label = labels[obj.id];
          labelIds.forEach(id => {
            label.labels = [...label.labels, labels[id]];
            labels[id].parentLabelId = label.id;
          })
          break;
        } case "note": {
          const note = notes[obj.id];
          labelIds.forEach(id => note.labels = [...note.labels, labels[id]]);
          break;
        } default: {
          console.log("unexpected meta field");
        }
      }
    });
    // transform labels and notes obj to arrays for dispatching
    notes = Object.values(notes);
    labels = Object.values(labels);
    // dispatching
    dispatch(labelAddMany(labels));
    dispatch(noteAddMany(notes));
    // close drop down menu
    props.toggleDrop();
  }

  return (
    <>
      <button
        className="btn-flat dropDownBtn"
        onClick={onClick}
        style={{textTransform: "none"}}
      >open</button>
      <input
        id="file"
        type="file"
        ref={fileInput}
        onChange={handleFile}
        accept=".csv"
        style={{display: "none"}}/>
      {/*<PopUp text="test" onYes={()=>console.log("yes")} onNo={()=>console.log("no")}/>*/}
    </>

  );
}
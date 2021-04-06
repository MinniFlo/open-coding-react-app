import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {readString} from "react-papaparse";
import {labelAddMany} from "../features/labelsSlice";
import {noteAddMany} from "../features/notesSlice";
import {saveStructure} from "../style/style";

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
    // on file read finish call the parse function
    reader.onloadend = (e) => checkFile(file, e.target.result);
    // read the file
    reader.readAsText(file);
  }

  const checkFile = (file, result) => {
    const resultHeader = result.replace(/\n/g, "").split(',', 7);
    if (file.type === "text/csv") {
      let isSaveState = true
      const saveStateStructure = Object.keys(saveStructure)
      resultHeader.forEach((ele, i) => {
        if (ele !== saveStateStructure[i]) {
          isSaveState = false;
        }
      })
      if (isSaveState) {
        parseData(result);
      } else {
        console.log("This File needs to be imported");
      }
    } else {
      console.log("Invalid file type!");
      props.toggleDrop();
    }
  }

  const parseData = data => {
    const dataParseObj = readString(data, {header: true ,skipEmptyLines: true});
    console.log(dataParseObj);
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
    dispatch(labelAddMany(labels));
    dispatch(noteAddMany(notes));
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
    </>

  );
}
import React, {useState} from "react";
import ImportMenuColumn from "./ImportMenuColumn";
import {customId, genColor} from "../style/style";
import {useDispatch} from "react-redux";
import {labelAddMany} from "../features/labelsSlice";
import {noteAddMany} from "../features/notesSlice";


export default function ImportMenu(props) {
  const [data, setData] = useState(props.data);
  const createInitialMeaningState = (data) => {
    let initialState = {};
    data.forEach((ele, i) => {
      initialState[i] = "label-tag";
    })
    return initialState;
  }
  const [columnMeaning, setColumnMeaning] = useState(createInitialMeaningState(data[0]));

  const dispatch = useDispatch();

  const closeImportMenu = () => {
    setData([]);
    setColumnMeaning([]);
    props.setImportOpen(false);
  }

  const updateColumnMeaning = (value, index) => {
    const newColumnMeaning = {...columnMeaning, [index]: value}
    setColumnMeaning(newColumnMeaning);
  }

  const columns = data[0].map((ele, i) => {
      const indexData = data.map(row => row[i]);
      return(<ImportMenuColumn key={ele + "_" + i} index={i} data={indexData} updateColumnMeaning={updateColumnMeaning}/>);
    }
  );

  const importData = () => {
    let labels = {};
    data[0].forEach((name, i) => {
      if (columnMeaning[i] === "label-tag") {
        const newLabel = {id: "", name: "", color: "", parentLabelId: "", labels: []};
        newLabel.id = customId();
        newLabel.name = name;
        newLabel.color = genColor();
        labels[i] = newLabel;
      }
    });
    
    let notes = {};
    data.forEach((row, j) => {
      // skip the Header row
      if (j === 0) {
        return;
      }
      const newNote = {id: "", content: "", labels: [], comment: "", position: {x: (j%12) * 185, y: Math.floor(j/12) * 180}};
      let validNote = true
      row.forEach((ele, i) => {
        switch (columnMeaning[i]) {
          case "content": {
            if (ele !== "") {
              newNote.content = newNote.content + "- " + ele;
            } else {
              validNote = false
            }
            break
          } case "comment": {
            if (ele !== "") {
              newNote.comment = newNote.comment + "- " + ele;
            }
            break
          } case "label-tag": {
            if (ele !== "") {
              newNote.labels = [...newNote.labels, labels[i]]
            }
            break
          }default: {
            console.log("col ignored: " + columnMeaning[i]);
          }
        }
      })
      if (validNote) {
        newNote.id = customId();
        notes[newNote.id] = newNote;
      }
    })
    labels = Object.values(labels);
    notes = Object.values(notes);

    dispatch(labelAddMany(labels));
    dispatch(noteAddMany(notes));

    closeImportMenu()
  }



  return (
    <div className="menuBackground import ">
      <h5 className="grey-text menuHeading menuContent">{"Importing File: " + props.fileName}</h5>
      <div className="importTableWrapper">
        <div className="importTable">
          {columns}
        </div>
      </div>
      <div className="menuContent">
        <button className="btn waves-effect waves-light grey darken-1" onClick={closeImportMenu}>
          cancel
        </button>
        <button className="btn waves-effect waves-light right" onClick={importData}>
          submit
        </button>
      </div>
    </div>
  );
}

import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectLabels} from "../features/labelsSlice";
import {selectNotes} from "../features/notesSlice";



export default function SaveFileButton(props) {

  const [downloadUrl, setDownloadUrl] = useState("");
  const doDownload = useRef(null);

  const labels = useSelector(selectLabels);
  const notes = useSelector(selectNotes);

  const createCsvData = (labels, notes) => {
    const rowStructure= {meta: "", id: "", content: "", comment: "", color: "", x: "", y: ""}
    labels.forEach(label => rowStructure[label.id] = "");

    let data = [Object.keys(rowStructure)];
    //labels
    labels.forEach(label => {
      const row = {...rowStructure};
      row.meta = "label";
      row.id = label.id;
      row.content = label.name;
      row.color = label.color;
      label.labels.forEach(label => row[label.id] = label.id);
      data = [...data, Object.values(row)];
    })
    //notes
    notes.forEach(note => {
      const row = {...rowStructure};
      row.meta = "note";
      row.id = note.id
      row.content = note.content;
      row.comment = note.comment;
      row.x = note.position.x;
      row.y = note.position.y;
      note.labels.forEach(label => row[label.id] = label.id)
      data = [...data, Object.values(row)];
    })
    return data
  }

  // nach dem Beispiel auf:
  //  https://javascript.plainenglish.io/how-to-create-download-and-upload-files-in-react-apps-80893da4247a
  //  besucht am 20.03.21 15Uhr
  // implementiert
  const createCsvStr = (data) => {
    let csvStr = "";
    data.forEach(row => {
      row.forEach((value, i) => {
        const inner_str = value !== null ? value.toString() : "";
        let result = inner_str.replace(/"/g, '""');
        if (result.search(/([,\n])/g) >= 0) {
          result = '"' + result + '"'
        }
        if (i > 0) {
          csvStr += ',';
        }
        csvStr += result;
      })
      csvStr += '\n';
    });
    return csvStr;
  }

  const download = () => {
    const data = createCsvData(labels, notes);
    const csvStr = createCsvStr(data);
    const blob = new Blob([csvStr]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    // download ist triggered on fileDownloadUrl change in useEffect
    setDownloadUrl(fileDownloadUrl);
  }

  useEffect(() => {
    if (downloadUrl !== "") {
      doDownload.current.click();
      // free space
      URL.revokeObjectURL(downloadUrl);
      // clear state
      setDownloadUrl("")
      props.toggleDrop();
    }
  },[downloadUrl]);

  return (
    <>
      <button
        className="btn-flat dropDownBtn"
        onClick={download}
        style={{textTransform: "none"}}
      >save</button>

      <a
         download="savedState.csv"
         href={downloadUrl}
         ref={doDownload}
         style={{display: "none"}}
      >download it</a>

    </>

  );
}
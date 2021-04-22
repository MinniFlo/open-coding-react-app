import React, {useEffect, useRef, useState} from "react";
import '../style/App.css';
import {readString} from "react-papaparse";


export default function ImportFileButton(props) {

  const fileInput = useRef(null);
  const [data, setData] = useState([])

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
      convertFile(result);
    } else {
      console.log(file)
      console.log("Invalid file type!");
      props.toggleDrop();
    }
  }

  const convertFile = (fileData) => {
    setData(readString(fileData, {skipEmptyLines: true}).data);
  }

  useEffect(() => {
    if (data.length !== 0) {
      props.getImportData(data, fileInput.current.files[0].name);
      props.toggleDrop();
    }
  // eslint-disable-next-line
  },[data])

  return (
    <>
      <button
        className="btn-flat dropDownBtn"
        onClick={onClick}
        style={{textTransform: "none"}}
      >import</button>
      <input
        id="file"
        type="file"
        ref={fileInput}
        onChange={handleFile}
        accept=".csv"
        style={{display: "none"}}
      />

    </>

  );
}
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

    reader.onloadend = (e) => convertFile(e.target.result);

    reader.readAsText(file);
  }


  const convertFile = (fileData) => {
    setData(readString(fileData, {skipEmptyLines: true}).data);
  }

  useEffect(() => {
    if (data.length !== 0) {
      props.getImportData(data);
      props.toggleDrop(false);
    }
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
        style={{display: "none"}}
      />

    </>

  );
}
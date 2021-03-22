import React, {useEffect, useRef, useState} from "react";
import '../style/App.css';
import {readString} from "react-papaparse";


export default function ImportFileButton(props) {

  const fileInput = useRef(null);

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
    const dataParseObj = readString(fileData, {header: true ,skipEmptyLines: true});
    console.log(dataParseObj);
    props.toggleDrop();
  }

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
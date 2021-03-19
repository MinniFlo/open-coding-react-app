import React, {useRef} from "react";


export default function ImportFileButton(props) {

  const fileInput = useRef(null);

  const onClick = () => {
    fileInput.current.click();
    console.log("open file ...")
  }

  const handleFile = () => {
    let file = fileInput.current.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => console.log(e.target.result.split('\n'));

    reader.readAsText(file);
  }

  return (
    <>
      <button
        className="btn-flat"
        onClick={onClick}
        style={{textTransform: "none"}}
      >import</button>
      <input
        id="file"
        type="file"
        ref={fileInput}
        onChange={handleFile}
        style={{display: "none"}}/>
    </>

  );
}
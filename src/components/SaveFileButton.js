import React, {useEffect, useRef, useState} from "react";


export default function SaveFileButton(props) {

  const [downloadUrl, setDownloadUrl] = useState("");
  const doDownload = useRef(null);

  useEffect(() => {
    if (downloadUrl !== "") {
      doDownload.current.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl("")
    }
  },[downloadUrl]);

  const download = () => {
    const testText = "I wanna be downloaded!";
    const blob = new Blob([testText]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadUrl(fileDownloadUrl);
  }

  return (
    <>
      <button
        className="btn-flat"
        onClick={download}
        style={{textTransform: "none"}}
      >save</button>

      <a
         download="savedState.txt"
         href={downloadUrl}
         ref={doDownload}
         style={{display: "none"}}
      >download it</a>

    </>

  );
}
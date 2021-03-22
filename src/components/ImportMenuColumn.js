import React, {useEffect, useState} from "react";

export default function ImportMenuColumn(props) {

  const {data, index, updateColumnMeaning} = props

  const [selectValue, setSelectValue] = useState("label");

  const updateValue = (e) => {
    setSelectValue(e.target.value);
  }

  useEffect(() => {
    updateColumnMeaning(selectValue, index);
  }, [selectValue])

  return(
    <>
      <select name="test" value={selectValue} style={{display:"inline"}} onChange={updateValue}>
        <option value="content">Content</option>
        <option value="comment">Comment</option>
        <option value="label">Label</option>
        <option value="ignore">Ignore</option>
      </select>
    </>
  );
}
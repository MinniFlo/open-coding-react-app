import React, {useEffect, useState} from "react";

export default function ImportMenuColumn(props) {

  const [selectValue, setSelectValue] = useState("label-tag");

  const updateValue = (e) => {
    setSelectValue(e.target.value);
  }

  useEffect( () => {
    props.updateColumnMeaning(selectValue, props.index);
  // eslint-disable-next-line
  }, [selectValue])

  // eslint-disable-next-line array-callback-return
  const table = props.data.map((ele, i) => {
    if (i < 10) {
      return (
        <p key={ele + i} className={i===0?"importTableCell Header truncate" : "importTableCell truncate"}>
          {ele===""?"-":ele}
        </p>);
    } else if (i === 10) {
      return (
        <p key={ele + i} className="importTableCell truncate">
          ...
        </p>);
    }
  });


  return(
    <div className="importMenuColumn">
      <div className="importMenuColumnContent">
        <select name="test" value={selectValue} style={{display:"inline"}} onChange={updateValue}>
        <option value="content">Content</option>
        <option value="comment">Comment</option>
        <option value="label-tag">Label</option>
        {/*<option value="label-name">Label as Name</option>*/}
        <option value="ignore">Ignore</option>
      </select>
        {table}
      </div>
    </div>
  );
}
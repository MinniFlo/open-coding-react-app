import React, {useState} from "react";
import ImportMenuColumn from "./ImportMenuColumn";


export default function ImportMenu(props) {
  const [data, setData] = useState([]);
  const [columnMeaning, setColumnMeaning] = useState({});
  const [columns, setColumns] = useState([]);

  const closeImportMenu = () => {
    setData([]);
    setColumnMeaning([]);
  }

  const buildColumns = () => {
    const test = [1, 2, 3, 4];
    console.log(data)
    const newColumns = test.map((ele, i) => {
      return(
        <ImportMenuColumn key={ele + "_" + i} index={i} data={ele} updateColumnMeaning={updateColumnMeaning}/>
      );
    });
    setColumns(newColumns);
  }

  const importData = () => {
    console.log(data);
    console.log(columnMeaning);
  }

  const updateColumnMeaning = (value, index) => setColumnMeaning(columnMeaning[index] = value);

  return (
    <div className="menuBackground menuContent">
      <div>
        {columns}
      </div>
      <div>
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

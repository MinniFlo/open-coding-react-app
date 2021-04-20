import React from "react";
import {useDispatch} from "react-redux";
import "../style/App.css";

export default function ClearButton(props) {

  const dispatch = useDispatch();

  const clear = () => {
    dispatch({type: 'CLEAR_STATE', payload: {}});
    props.toggleDrop();
  }

  return (
      <button
        className="btn-flat dropDownBtn"
        onClick={clear}
        style={{textTransform: "none"}}
      >clear canvas</button>
  );
}
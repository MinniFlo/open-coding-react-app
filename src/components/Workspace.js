import React from "react";
import '../style/App.css'
import Note from "./Note";

import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

export default function Workspace() {
  return (
    <div id='Workspace'>
      <Note text='Das'/>
      <Note text='ist'/>
      <Note text='ein'/>
      <Note text='test:'/>
      <Note text='test!'/>
    </div>
  );
}
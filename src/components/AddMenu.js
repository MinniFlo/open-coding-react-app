import React, {useState} from "react";
import AddButton from "./AddButton";
import NoteAddMenu from "./NoteAddMenu";
import LabelAddMenu from "./LabelAddMenu";
import {colors, addMenuStyle, noteStyle} from "../style/style";


const {backgroundStyle, tabStyle, activeTabStyle} = addMenuStyle
const {position} = noteStyle;

export default function AddMenu() {

  const [open, setOpen] = useState(false);
  const [noteTab, setNoteTab] = useState(true);

  const toggleOpen = () => setOpen(!open);

  // const onFocusLeave = (e) => {
  //     if (!e.currentTarget.contains(e.relatedTarget)) {
  //       console.log(e);
  //
  //       toggleOpen();
  //     }
  // }

  const handleTabs = e => {
    if (e.target.id === "note" && !noteTab) {
      setNoteTab(true);
    } else if (e.target.id === "label" && noteTab) {
      setNoteTab(false);
    }
  };


  return (
    <>
      {open ?
        <div id="addMenu" className={"card " + colors.background + colors.text} style={backgroundStyle}>
          <div id="tabs" className="row">
            <div id="note" className="col s6" onClick={handleTabs}
                    style={noteTab ? activeTabStyle: tabStyle}
            >Note</div>
            <div id="label" className="col s6" onClick={handleTabs}
                    style={noteTab ? tabStyle: activeTabStyle}
            >Label</div>
          </div>
          {noteTab ?
            <NoteAddMenu toggleOpen={toggleOpen} id={""} content={""} labels={[]} comment={""} position={position} edit={false} /> :

            <LabelAddMenu toggleOpen={toggleOpen}/>
          }
        </div>
        :
        <AddButton onClick={toggleOpen}/>
      }
    </>
  );
}
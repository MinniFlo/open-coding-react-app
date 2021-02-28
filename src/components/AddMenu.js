import React, {useState} from "react";
import AddButton from "./Layout/AddButton";
import NoteAddMenu from "./Layout/NoteAddMenu";
import LabelAddMenu from "./Layout/LabelAddMenu";
import {colors, addMenuStyle} from "../style/style";


const {backgroundStyle, tabStyle, activeTabStyle} = addMenuStyle

export default function AddMenu(props) {

  const [open, setOpen] = useState(false);
  const [noteTab, setNoteTab] = useState(true);

  const toggleOpen = () => setOpen(!open);

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
        <div className={"card " + colors.background + colors.text} style={backgroundStyle}>
          <div className="row">
            <button id="note" className="btn-flat col s6" onClick={handleTabs}
                    style={noteTab ? activeTabStyle: tabStyle}
            >Note</button>
            <button id="label" className="btn-flat col s6" onClick={handleTabs}
                    style={noteTab ? tabStyle: activeTabStyle}
            >Label</button>
          </div>
          {noteTab ?
            <NoteAddMenu
              toggleOpen={toggleOpen}
              newNote={props.newNote}/> :

            <LabelAddMenu
              toggleOpen={toggleOpen}
              newLabel={props.newLabel}/>
          }
        </div>
        :
        <AddButton onClick={toggleOpen}/>
      }
    </>
  );
}
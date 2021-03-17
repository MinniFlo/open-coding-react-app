import React, {useState} from "react";
import AddButton from "./AddButton";
import NoteAddMenu from "./NoteAddMenu";
import LabelAddMenu from "./LabelAddMenu";
import '../style/App.css'


const position = {x: 100, y: 100};

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
        <div id="addMenu" className="menuBackground">
          <div id="tabs" className="row">
            <div id="note" onClick={handleTabs}
                 className={noteTab ? "menuTab active col s6" : "menuTab col s6"}
            >Note</div>
            <div id="label" onClick={handleTabs}
                 className={noteTab ? "menuTab col s6" : "menuTab active col s6"}
            >Label</div>
          </div>
          {noteTab ?
            <NoteAddMenu toggleOpen={toggleOpen} id={""} content={""} labels={[]} comment={""} position={position}/> :

            <LabelAddMenu toggleOpen={toggleOpen} id={""} name={""} color={""} labels={[]}/>
          }
        </div>
        :
        <AddButton onClick={toggleOpen}/>
      }
    </>
  );
}
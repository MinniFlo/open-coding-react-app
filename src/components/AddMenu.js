import React from "react";
import AddButton from "./Layout/AddButton";
import NoteAddMenu from "./Layout/NoteAddMenu";
import LabelAddMenu from "./Layout/LabelAddMenu";
import {colors, addMenuStyle} from "../style/style";
import M from "materialize-css";


const {backgroundStyle, tabStyle, activeTabStyle} = addMenuStyle

export default class AddMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      noteOpen: true,
      content: '',
    }

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleTabs = this.handleTabs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitNote = this.onSubmitNote.bind(this);
  }

  componentDidMount() {
    let tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
  }

  toggleOpen() {
    this.setState({open: !this.state.open});
  }

  handleTabs(e) {
    if (e.target.id === "note" && !this.state.noteOpen) {
      this.setState({noteOpen: true});
    } else if (e.target.id === "label" && this.state.noteOpen) {
      this.setState({noteOpen: false});
    }
  }

  handleChange(e) {
    this.setState({content: e.target.value});
  }

  onSubmitNote() {
    console.log('submit!');
    this.toggleOpen();
    this.props.createSingleNote(this.state.content);
  }

  render() {
    return (
      <>
        {this.state.open ?
          <div className={"card " + colors.background + colors.text} style={backgroundStyle}>
            <div className="row">
              <button id="note" className="btn-flat col s6" onClick={this.handleTabs}
                      style={this.state.noteOpen ? activeTabStyle: tabStyle}
              >Note</button>
              <button id="label" className="btn-flat col s6" onClick={this.handleTabs}
                      style={this.state.noteOpen ? tabStyle: activeTabStyle}
              >Label</button>
            </div>
            {this.state.noteOpen ?
              <NoteAddMenu
                toggleOpen={this.toggleOpen}
                newNote={this.props.newNote}/> :

              <LabelAddMenu
                toggleOpen={this.toggleOpen}
                newLabel={this.props.newLabel}/>
            }
          </div>
          :
          <AddButton onClick={this.toggleOpen}/>
        }
      </>
    );
  }
}
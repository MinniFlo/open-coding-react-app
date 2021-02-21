import React from "react";
import {IconButton, makeStyles} from "@material-ui/core";
import {Add} from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    zIndex: 1,
  },
  label: {
    borderRadius: 60,
    backgroundColor: "#eee",
    boxShadow: "0 0 3px #333",
    color: "primary",
    height: 40,
    width: 40,
  }
})

export default function CreateNoteButton(props) {
  const classes = useStyles();

  return (
    <IconButton className={classes.root} aria-label='add Note' onClick={props.toggleOpen}>
      <Add  className={classes.label} style={{fontSize: 30}}/>
    </IconButton>
  );
}
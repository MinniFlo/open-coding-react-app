import React from "react";
import {makeStyles} from "@material-ui/core";
import {Paper} from "@material-ui/core";


const useStyle = makeStyles({
  root: {
    position: "fixed",
    backgroundColor: "#eee",
    margin: 15,
    top: 50,
    zIndex: 1,
  }
})

export default function (props) {
  const classes = useStyle();

  return(
    <Paper
      classes={{root: classes.root}}
      square
      variant='outlined'
      {... props}
    >
      {props.children}
    </Paper>
  );
}
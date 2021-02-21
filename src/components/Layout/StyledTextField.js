import React from "react";
import {makeStyles, TextField} from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    width: "94%",
    margin: "3%",
    borderRadius: 3,
    backgroundColor: "primary",
    },
})

export default function StyledTextField(props) {
  const classes = useStyle();
  return (
    <TextField
      id="outlined-multiline-static"
      classes={{root: classes.root, label: classes.label, active: classes.active}}
      variant="outlined"
      multiline

      {...props}
    />
  )
}
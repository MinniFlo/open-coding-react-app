import React from "react";
import {Button, makeStyles} from "@material-ui/core";


const useStyle = makeStyles({
  root:{
    margin: 10,
    padding: "0 10px",
    borderRadius: 0,
    backgroundColor: "#fff",
    float: "right",
  },
})

export default function StyledButton(props) {
  const classes = useStyle();

  return (
    <Button
      classes={{root: classes.root}}
      variant="filled"
      {...props}
    >
      {props.value}
    </Button>
  );
}
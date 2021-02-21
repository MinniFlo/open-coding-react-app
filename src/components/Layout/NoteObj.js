import React from "react";
import {IconButton, Paper, Typography, makeStyles} from "@material-ui/core";
import {MoreHoriz} from "@material-ui/icons";
import Draggable from 'react-draggable'

const useStyle = makeStyles((theme) => ({
  paper: {
    maxHeight: 180,
    minHeight: 100,
    width: 200,
    zIndex: 0,
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    overflowY: "hidden",
  },
  button: {
    padding: 0,
  },

}));

export default function NoteObj(props) {
  const classes = useStyle();
  return (
    <Draggable>
      <Paper className={classes.paper}>
        <IconButton className={classes.button}>
          <MoreHoriz />
        </IconButton>
        <Typography display="block" >
          {props.content}
        </Typography>
      </Paper>
    </Draggable>
  );
}
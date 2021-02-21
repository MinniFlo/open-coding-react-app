import React from "react";
import {Drawer, Grid, List, ListItem, makeStyles, Toolbar, Typography} from "@material-ui/core";

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  labelColor: {
    height: 20,
    width: 20,
    color: "#a55",
    borderRadius: 4,
  }
}));

export default function Sidebar() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem>
            <Typography>Lable1</Typography>
          </ListItem>
          <ListItem>
            <Typography>Lable2</Typography>
          </ListItem>
          <ListItem>
            <Typography>Lable3</Typography>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
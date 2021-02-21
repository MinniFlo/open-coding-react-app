import React from "react"
import { AppBar, Toolbar, Typography, Grid} from "@material-ui/core";
import DropDownMenu from "./DropDownMenu";


export default function Header(props) {


  return (
    <AppBar>
      <Toolbar variant="dense">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item><DropDownMenu/></Grid>
          <Grid item>
            <Typography>
              {props.fileName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              { "Zoom: " + props.zoom * 100 + "%"}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
import React from "react";
import {Menu, Button, MenuItem, withStyles} from "@material-ui/core";

const MenuButton = withStyles((theme) => ({
  root: {
    padding: "0" + theme.spacing(8),
    BackgroundColor: theme.palette.secondary
  },
  label: {
    color: "white",
  }
})) (Button);

const StyledMenu = withStyles({
  rounded: {
    borderRadius: 0,
  }

}) (Menu);

export default function DropDownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuButton aria-controls="options" aria-haspopup="true" onClick={handleClick} value='File'>
        File
      </MenuButton>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        color='primary'
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>import</MenuItem>
        <MenuItem onClick={handleClose}>open</MenuItem>
        <MenuItem onClick={handleClose}>save</MenuItem>
        <MenuItem onClick={handleClose}>save as</MenuItem>
        <MenuItem onClick={handleClose}>export</MenuItem>
      </StyledMenu>
    </div>
  );
}
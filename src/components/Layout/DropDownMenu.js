import React from "react";
import { Menu, Button, MenuItem} from "@material-ui/core";

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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        File
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        color='primary'
      >
        <MenuItem onClick={handleClose}>import</MenuItem>
        <MenuItem onClick={handleClose}>open</MenuItem>
        <MenuItem onClick={handleClose}>save</MenuItem>
        <MenuItem onClick={handleClose}>save as</MenuItem>
        <MenuItem onClick={handleClose}>export</MenuItem>
      </Menu>
    </div>
  );
}
import React, { useState , useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const OPTION_ADD_APPOINTMENT = 'Add Appointment';
const OPTION_CHANGE_VIEW = 'Change View';
const OPTION_FILTER = 'Filter'
const options = [OPTION_ADD_APPOINTMENT, OPTION_CHANGE_VIEW, OPTION_FILTER];

export default function SplitButton({ toggleView, setToggleView, setOpenApptModal, setApptModalType }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  // Click function for nav button click
  const handleClick = () => {
    // Switch Case on which option was chosen
    switch (options[selectedIndex]) {
      case OPTION_ADD_APPOINTMENT:
        setOpenApptModal(true);
        setApptModalType('add-appt');
        break;
      case OPTION_CHANGE_VIEW:
        setToggleView(toggleView => !toggleView);
        break;
      case OPTION_FILTER:
        setOpenApptModal(true);
        setApptModalType('filter');
        break;
    }
  };

  // Click function for button drop down menu
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  // Function to toggle menu open and close
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Box sx={{ WebkitAlignSelf: { xs: 'center', sm: 'flex-end', md: 'flex-end' }, px: 3, mr: { xss: 0, xs: 0, sm: '8%', md: '8%' }, }}>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                    key={option}
                    disabled={index === 2 && toggleView === false}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

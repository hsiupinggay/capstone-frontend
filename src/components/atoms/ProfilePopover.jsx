/* eslint-disable react/prop-types */
import React from 'react';
import { Stack, Popover, Button } from '@mui/material';

function ProfilePopover({
  open, id, anchorEl, onClose, popoverContent, submitClick,
}) {
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          spacing={1}
          justifyContent="center"
        >
          {popoverContent}
          <div>
            <Button variant="contained" onClick={submitClick}>SUBMIT</Button>
          </div>
        </Stack>
      </Popover>
    </div>
  );
}

export default ProfilePopover;

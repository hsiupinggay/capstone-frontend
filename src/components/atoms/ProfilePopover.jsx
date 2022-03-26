/* eslint-disable react/prop-types */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React from 'react';
import {
  Stack, Popover, Button, Box,
} from '@mui/material';

/*
 * ========================================================
 * ========================================================
 *
 *               ProfilePopover Component
 *
 * ========================================================
 * ========================================================
 */
export default function ProfilePopover({
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
          vertical: 320,
          horizontal: 'right',
        }}
      >
        <Stack
          spacing={1}
          justifyContent="center"
        >
          {popoverContent}
          <Box sx={{
            padding: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <Button variant="contained" onClick={submitClick}>SUBMIT</Button>
          </Box>
        </Stack>

      </Popover>
    </div>
  );
}

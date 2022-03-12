/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, Box, Typography } from '@mui/material';

// ProfilePage > ProfileAvatar (AddPhoto) > ProfilePopover

function AddPhoto({
  caption, setCaption, setUploadedPhoto,
}) {
  const imageHandler = (e) => {
    setUploadedPhoto(e.target.files[0]);
    const [file] = e.target.files;
    // Get the file name and size
    const { name: fileName, size } = file;
    // Convert size in bytes to kilo bytes
    const fileSize = (size / 1000).toFixed(2);
    setCaption(`${fileName}-${fileSize}kb`);
  };

  return (
    <div>
      <FormControl>
        <Box sx={{ height: '60px', mt: 3, justifyCenter: 'center' }}>
          <label htmlFor="item-photo">
            <input type="file" id="item-photo" name="item-photo" className="file" onChange={imageHandler} accept="image/*" />
            <br />
            <Typography variant="caption">{caption}</Typography>
          </label>

        </Box>
      </FormControl>
    </div>
  );
}

export default AddPhoto;

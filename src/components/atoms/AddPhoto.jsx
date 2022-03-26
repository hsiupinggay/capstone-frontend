/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
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
  FormControl, Box, Button, Typography,
} from '@mui/material';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import addPhotoStyles from './AddPhotoCss';

/*
* ========================================================
* ========================================================
*
*                 AddPhoto Component
*  ProfilePage > ProfileAvatar (AddPhoto) > ProfilePopover
*
* ========================================================
* ========================================================
*/
export default function AddPhoto({ setUploadedPhoto, caption, setCaption }) {
  const imageHandler = (e) => {
    setUploadedPhoto(e.target.files[0]);
    setCaption('Pic selected!');
  };

  return (
    <div>
      <FormControl>
        <Box sx={addPhotoStyles.container}>
          <input type="file" id="item-photo" name="item-photo" className="file" onChange={imageHandler} accept="image/*" hidden />
          <label htmlFor="item-photo">
            <Button
              component="span"
              size="small"
              startIcon={<FolderZipIcon />}
              type="file"
              id="item-photo"
              name="item-photo"
              className="file"
              onChange={imageHandler}
              accept="image/*"
              sx={addPhotoStyles.selectBtn}
            >
              Select
            </Button>
          </label>
          <Typography sx={addPhotoStyles.text}>{caption}</Typography>
        </Box>
      </FormControl>
    </div>
  );
}

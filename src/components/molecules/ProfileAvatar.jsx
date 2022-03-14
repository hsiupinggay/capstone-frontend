/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Avatar, Badge,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ProfilePopover from '../atoms/ProfilePopover';
import { getNameInitials } from '../others/helper';
import { useMedicalContext } from '../others/store';

// ProfilePage > ProfileAvatar (AddPhoto) > ProfilePopover

function ProfileAvatar({
  popoverContent, currentPhoto, submitClick,
}) {
  const [anchorEl, setAnchorEl] = useState();
  const { store } = useMedicalContext();

  // firstName, lastName for alt text in avatar photo
  const {
    firstName, lastName,
  } = store;
  // generate user initals
  // if user has no photo, avatar will show initials
  const userInitials = getNameInitials(firstName, lastName);

  // For edit photo button
  // Variables that control popover
  const editPhotoClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const photoClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Badge
        overlap="circular"
        onClick={editPhotoClick}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <AddAPhotoIcon color="primary" />
      }
      >
        {!currentPhoto && <Avatar sx={{ width: 60, height: 60 }}>{userInitials}</Avatar>}
        {currentPhoto
        && <Avatar sx={{ width: 60, height: 60 }} alt={firstName.concat(lastName)} src={currentPhoto} />}
      </Badge>
      <ProfilePopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={photoClose}
        submitClick={submitClick}
        popoverContent={popoverContent}
      />
    </div>
  );
}

export default ProfileAvatar;

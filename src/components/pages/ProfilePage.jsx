/* eslint-disable max-len */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState, useEffect } from 'react';
import {
  Stack,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useMedicalContext, uploadPhoto } from '../others/store';
import AddPhoto from '../atoms/AddPhoto';
import ProfileAvatar from '../molecules/ProfileAvatar';

/*
 * ========================================================
 * ========================================================
 *                Profile Page Component
 *  ProfilePage > ProfileAvatar (AddPhoto) > ProfilePopover
 *           ProfilePage > ViewProfile || EditProfile
 * ========================================================
 * ========================================================
 */

export default function ProfilePage() {
  const [uploadedPhoto, setUploadedPhoto] = useState();
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [caption, setCaption] = useState('No files uploaded');
  // const [isAuth, setIsAuth] = useState(false)
  const { store, dispatch } = useMedicalContext();
  const { userId } = store;
  // const navigate = useNavigate();

  useEffect(() => {
    const { photo } = store;
    setCurrentPhoto(photo);
    // const isAuth = async () => {
    //   const res = await authenticate(dispatch);
    //   console.log('<== res ==>', res);
    //   if (!res) navigate('/auth');
    // };
    // isAuth();
  }, []);

  const submitPhoto = async () => {
    const data = new FormData();
    data.append('userId', userId);
    data.append('photo', uploadedPhoto);

    const res = await uploadPhoto(dispatch, data);

    setCurrentPhoto(res.userPhoto);
  };

  return (
    <Stack
      spacing={2}
      justifyContent="center"
    >
      <ProfileAvatar
        popoverContent={<AddPhoto caption={caption} setCaption={setCaption} setUploadedPhoto={setUploadedPhoto} />}
        currentPhoto={currentPhoto}
        submitClick={submitPhoto}
      />
      <Outlet />
    </Stack>
  );
}

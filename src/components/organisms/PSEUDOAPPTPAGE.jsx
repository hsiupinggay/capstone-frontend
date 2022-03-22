/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/*
 * ========================================================
 * ========================================================
 *
 *                       Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useState } from 'react';
import {
  Modal, Box,
} from '@mui/material';
import AddAppointment from './AddAppointment';
import AddDetailsTabs from './AddDetailsTabs';

/*
 * ========================================================
 * ========================================================
 *
 *                   Modal styling
 *
 * ========================================================
 * ========================================================
 */
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    md: 600,
    sm: 500,
    xs: 475,
  },
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  display: 'flex',
  justifyContent: 'center',
  // alignItems: 'center',
};

/*

 * ========================================================
 * ========================================================
 *
 *        Component for rendering add patient form
 *
 * ========================================================
 * ========================================================
 */
export default function PSEUDOAPPTPAGE() {
  const [open, setOpen] = useState(false);
  const [addition, setAddition] = useState(false);
  const [modal, setModal] = useState();

  const openPopup = () => {
    setOpen(true);
    setModal('add appointment');
  };

  const closePopup = () => {
    setOpen(false);
    setModal();
  };

  return (
    <div>
      <button type="button" onClick={openPopup}>Click me</button>
      <Modal
        open={open}
        onClose={closePopup}
      >
        <Box sx={modalStyle}>
          {
          modal === 'add appointment'
            ? <AddAppointment setAddition={setAddition} setModal={setModal} />
            : <AddDetailsTabs addition={addition} setAddition={setAddition} setModal={setModal} />
           }
        </Box>
      </Modal>
    </div>
  );
}

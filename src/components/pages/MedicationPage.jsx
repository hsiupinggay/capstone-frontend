/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/*
 * ========================================================
 * ========================================================
 *
 *                        Import
 *
 * ========================================================
 * ========================================================
 */
import React, { useEffect, useState } from 'react';
import {
  Card, CardActions, CardContent, Stack, Typography, Grid, IconButton, Tooltip, Modal, Box,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddMedCard from '../organisms/AddMedCard';
import style from './ModalCss';
import EditMedCard from '../organisms/EditMedCard';
import TelegramCard from '../organisms/TelegramCard';

/*
 * ========================================================
 * ========================================================
 *
 *          Medication Page of specific patient
 *
 * ========================================================
 * ========================================================
 */
function MedicationPage() {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [medicineList, setMedicineList] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);

  // react router related
  // get params sent to this location from prev location
  const location = useLocation();
  const patientId = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const callBack = async () => {
      const data = new URLSearchParams();
      data.append('patientId', patientId);
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/med-list?${data.toString()}`);
      console.log(res.data);
      const { medication } = res.data;
      setMedicineList(medication);
      setLoading(false);
    };
    callBack();
  }, [open, render]);

  // event handlers for modal
  // renders either add or edit card
  const handleAdd = () => {
    setModalContent('add');
    setOpen(true);
  };
  const handleEdit = (id) => {
    setMedicineId(id);
    setModalContent('edit');
    setOpen(true);
  };
  const handleReminder = () => {
    setModalContent('reminder');
    setOpen(true);
  };
  const handleClose = () => {
    setModalContent('');
    setOpen(false);
  };

  // event handler for delete button
  const handleDelete = async (id) => {
    console.log('medicine id delete', id);
    const data = new URLSearchParams();
    data.append('medicineId', id);
    data.append('patientId', patientId);
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/patient/delete?${data.toString()}`);
    // pseudostate to ensure that useEffect runs everytime delete button is clicked
    setRender(!render);
  };

  return (
    <Box sx={{
      width: {
        xs: '200px',
        sm: '400px',
      },
      mb: '70px',
    }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalContent === 'add' && <AddMedCard setOpen={setOpen} patientId={patientId} />}
          {modalContent === 'edit' && <EditMedCard setOpen={setOpen} patientId={patientId} medicineId={medicineId} />}
          {modalContent === 'reminder' && <TelegramCard patientId={patientId} /> }
        </Box>
      </Modal>
      <div>
        <Stack
          direction="row"
          spacing={2}
          mb={2}
        >
          <Typography variant="h1">
            Medication
          </Typography>
          <Tooltip title="Add Medication" arrow>
            <IconButton aria-label="add medication" color="primary" onClick={handleAdd}>
              <AddCircleRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Subscribe to Reminders" arrow>
            <IconButton aria-label="Subscribe to Reminders" color="primary" onClick={handleReminder}>
              <CircleNotificationsRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {!loading && (
        <Grid container spacing={2}>
          {medicineList.map((e) => (
            <Grid item xs={12} sm={6}>
              <Card key={e._id}>
                <CardContent>
                  <Typography variant="h3">
                    {e.name}
                  </Typography>
                  {e.frequency.asRequiredChecked
                    ? <Typography variant="body1">As required</Typography>
                    : (
                      <Typography variant="body1">

                        {`${e.frequency.dosage}
            ${e.frequency.dosageCounter}`}
                        <br />
                        {e.frequency.times}
                        {' '}
                        {e.frequency.times === 1 ? 'time' : 'times'}
                        {' '}
                        {e.frequency.perDuration === '1' ? 'everyday' : `every ${e.frequency.perDuration} days`}
                      </Typography>
                    )}

                  <Typography variant="body1">
                    {`${e.lastPrescribed.prescriptionDate.split('T')[0]} `}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="Delete" arrow>
                    <IconButton aria-label="Delete medication" color="secondary" onClick={() => { handleDelete(e._id); }}>
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" arrow>
                    <IconButton aria-label="Edit medication" color="secondary" onClick={() => { handleEdit(e._id); }}>
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        )}

      </div>
    </Box>
  );
}

export default MedicationPage;

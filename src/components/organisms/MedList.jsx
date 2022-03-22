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
  Card, CardActions, CardContent, Stack, Typography, Grid, IconButton, Tooltip, Button, Modal, Box,
} from '@mui/material';
import axios from 'axios';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useNavigate, useLocation } from 'react-router-dom';

/*
 * ========================================================
 * ========================================================
 *
 *          Lists medicine of particular patient
 *
 * ========================================================
 * ========================================================
 */

function MedList() {
  const [medicineList, setMedicineList] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const patientId = location.state;
  console.log('<== patientId ==>', patientId);

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
  }, []);
  console.log(medicineList);
  const handleClick = (id) => {
    navigate('/edit-med', { state: { id, patientId } });
    console.log('<== e.target ==>', id);
  };

  const handleDelete = async (id) => {
    console.log('medicine id delete', id);
    const data = new URLSearchParams();
    data.append('medicineId', id);
    data.append('patientId', patientId);
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/patient/delete?${data.toString()}`);
    console.log(res.data);
  };

  const handleAdd = async () => {
    navigate('/add-med');
  };
  return (
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
      </Stack>

      {!loading && (
      <Grid container spacing={2}>
        {medicineList.map((e) => (
          <Grid item xs={12} md={6}>
            <Card key={e._id}>
              <CardContent>
                <Typography variant="h3">
                  {e.name}
                </Typography>
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
                  <IconButton aria-label="Edit medication" color="secondary" onClick={() => { handleClick(e._id); }}>
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
  );
}

export default MedList;

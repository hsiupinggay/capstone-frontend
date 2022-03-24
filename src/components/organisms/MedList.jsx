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
  Card, CardActions, CardContent, Stack, Typography, Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMedicalContext } from '../others/store';

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
  const { store } = useMedicalContext();
  const { patientId } = store;

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
  return (
    <div>
      <Typography>
        Medication
      </Typography>

      <Stack
        spacing={1}
      >
        {!loading && (
          <div>
            {medicineList.map((e) => (
              <Card key={e._id}>
                <CardContent>
                  <Typography variant="h3">
                    {e.name}
                  </Typography>
                  <Typography variant="body1">
                    {`take ${e.frequency.dosage}
            ${e.frequency.dosageCounter}`}
                    <br />
                    {e.frequency.times}
                    {' '}
                    {e.frequency.time === '1' ? 'time' : 'times'}
                    {' '}
                    {e.frequency.perDuration === '1' ? 'everyday' : `every ${e.frequency.perDuration} days`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => { handleDelete(e._id); }}>
                    Delete
                  </Button>
                  <Button onClick={() => { handleClick(e._id); }}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )}
      </Stack>
    </div>
  );
}

export default MedList;

/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Stack, Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MedList() {
  const [medicineList, setMedicineList] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const callBack = async () => {
      // Hardcoded patient id for Humpty Dumpty
      const patientId = '62259fadb4a77ae0343f7306';
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
    navigate('/edit-med', { state: id });
    console.log('<== e.target ==>', id);
  };

  return (
    <div>
      <Stack
        spacing={1}
      >
        {!loading && (
          <div>
            {medicineList.map((e) => (
              <Card key={e._id} onClick={() => { handleClick(e._id); }}>
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
              </Card>
            ))}
          </div>
        )}
      </Stack>
    </div>
  );
}

export default MedList;

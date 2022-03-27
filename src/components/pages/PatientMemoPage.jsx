/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unescaped-entities */
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar, Modal, Box, Typography, Card, IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { flexbox } from '@mui/system';
import { useMedicalContext } from '../others/store';
import { getNameInitials } from '../others/helper';
import FilterPatientMemos from '../organisms/FilterPatientMemos';

/*
 * ========================================================
 * ========================================================
 *
 *                   Modal styling
 *
 * ========================================================
 * ========================================================
 */
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  border: '1px solid #b0b0b0',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
  overflow: 'scroll',
};

/*
 * ========================================================
 * ========================================================
 *
 *                PatientMemoPage Component
 *
 * ========================================================
 * ========================================================
 */
export default function PatientMemoPage() {
  const [order, setOrder] = useState('latest first');
  const [name, setName] = useState();
  const [memoList, setMemoList] = useState();
  const [fullMemoList, setFullMemoList] = useState();
  const [deptArr, setDeptArr] = useState();
  const [dateArr, setDatetArr] = useState();
  const [hospArr, setHospArr] = useState();
  const [chapArr, setChapArr] = useState();
  const { store } = useMedicalContext();
  const [open, setOpen] = useState(false);

  const { patientId } = store;
  const navigate = useNavigate();

  // When component renders, retrieve patient's visit details
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('patientId', patientId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/patient-memos?${data.toString()}`)
      .then((response) => {
        const {
          appointmentArr, patientName, uniqueChaps, uniqueDates, uniqueDepts, uniqueHosps,
        } = response.data;
        setName(patientName);
        setMemoList(appointmentArr);
        // Remeber original array to reset filter
        setFullMemoList(appointmentArr);
        // Filter array options
        setDeptArr(uniqueDepts);
        setDatetArr(uniqueDates);
        setHospArr(uniqueHosps);
        setChapArr(uniqueChaps);
      });
  }, []);

  // Sort memos based on appointment date
  const sortDate = () => {
    if (order === 'latest first') {
      memoList.sort((a, b) => new Date(a.convertedDate) - new Date(b.convertedDate));
      setOrder('oldest first');
      setMemoList(memoList);
    } else {
      memoList.sort((a, b) => new Date(b.convertedDate) - new Date(a.convertedDate));
      setOrder('latest first');
      setMemoList(memoList);
    }
  };

  // When user clicks on button, render popup to filter memos
  const openPopUp = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const resetFilters = () => {
    setMemoList(fullMemoList);
  };

  return (
    <div>
      {
        memoList === undefined || memoList.length === 0
          ? (
            <Box>
              <Tooltip arrow title="Go Back">
                <ArrowCircleLeftIcon fontSize="large" color="primary" variant="contained" onClick={() => navigate('/patient')} />
              </Tooltip>
              <Typography variant="h3" display="inline" style={{ fontWeight: 'fontWeightBold' }} sx={{ m: 2 }}>Nil memos found</Typography>
            </Box>
          )
          : (
            <Box>
              <Box sx={{ m: 2, display: 'flex', alignItems: 'center' }}>
                <Tooltip arrow title="Go Back">
                  <IconButton sx={{ marginRight: 2 }}>
                    <ArrowCircleLeftIcon fontSize="large" color="primary" variant="contained" onClick={() => navigate('/patient')} />
                  </IconButton>
                </Tooltip>
                <Typography variant="h3" fontWeight="fontWeightBold" fontSize="28px" display="inline" sx={{ mr: 2 }}>
                  {`List of ${name}'s Memos`}
                </Typography>
                <Tooltip title="Sort By Appointment Date">
                  <IconButton>
                    <CalendarMonthIcon
                      color="primary"
                      variant="contained"
                      onClick={sortDate}
                    />

                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter Memos">
                  <IconButton>
                    <FilterAltIcon color="primary" variant="contained" onClick={openPopUp} />

                  </IconButton>
                </Tooltip>
                <Tooltip title="Reset Filters">
                  <IconButton>

                    <RestartAltIcon color="primary" variant="contained" onClick={resetFilters} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box style={{ maxHeight: 700, overflow: 'auto' }}>
                {memoList.map((memo) => (
                  <Card elevation={6} rounded sx={{ borderRadius: 2, p: 2, m: 2 }}>
                    <Typography variant="body1" fontWeight="fontWeightBold" fontSize="32px">Memo: </Typography>
                    <Typography variant="body1" component="div" fontSize="18px">
                      <Box fontWeight="fontWeightBold" display="inline">
                        Memo:
                      </Box>
                      {' '}
                      {`${memo.notes.note}`}
                      <br />
                      <Box fontWeight="fontWeightBold" display="inline">
                        Appt Date:
                      </Box>
                      {' '}

                      {`${memo.date}`}
                      <br />
                      <Box fontWeight="fontWeightBold" display="inline">
                        Hospital:
                      </Box>
                      {' '}

                      {`${memo.hospital.name}`}
                      <br />
                      <Box fontWeight="fontWeightBold" display="inline">
                        Appt Date:
                      </Box>
                      {' '}

                      {`${memo.hospital.department}`}
                      <br />
                      <Box fontWeight="fontWeightBold" display="inline">
                        Chaperone:
                        {' '}
                      </Box>
                      {memo.chaperone !== undefined
                        ? (
                          <Box display="inline">{memo.chaperone.name}</Box>
                        )
                        : <Box display="inline">Nil</Box>}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Box>
                        <Typography variant="body1" fontWeight="fontWeightBold" fontSize="18px">Uploaded by:</Typography>
                        <Typography variant="body1" fontSize="16px">{`${memo.notes.userName.first} ${memo.notes.userName.last} on ${memo.notes.date}`}</Typography>
                      </Box>
                      <Box sx={{ mx: 2, paddingTop: 3 }}>
                        {!memo.notes.userImage && <Avatar sx={{ width: 40, height: 40 }}>{getNameInitials(memo.notes.userName.first, memo.notes.userName.last)}</Avatar>}
                        {memo.notes.userImage && <Avatar sx={{ width: 40, height: 40 }} alt="profile" src={memo.notes.userImage} />}
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          )
      }
      <Modal
        open={open}
        onClose={closePopup}
      >
        <Box sx={style}>
          <FilterPatientMemos deptArr={deptArr} dateArr={dateArr} hospArr={hospArr} chapArr={chapArr} fullMemoList={fullMemoList} setMemoList={setMemoList} name={name} setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}

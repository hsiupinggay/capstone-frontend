/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable no-console */
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
  Modal, Box, Typography, Tooltip, IconButton, Stack, Card, CardContent, Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useMedicalContext } from '../others/store';
import AddHospitalTruncated from '../organisms/AddHospitalTruncated';
import AddDepartmentTruncated from '../organisms/AddDepartmentTruncated';
import AddChaperoneTruncated from '../organisms/AddChaperoneTruncated';
import BackIcon from '../molecules/BackIcon';
import style from './ModalCss';

/*
 * ========================================================
 * ========================================================
 *
 *          PatientVisitLocationPage Component
 *
 * ========================================================
 * ========================================================
 */
export default function PatientVisitLocationPage() {
  const [clinicsArr, setClinicsArr] = useState();
  const [chaperonesArr, setChaperonesArr] = useState();
  const [name, setName] = useState();
  const [hospital, setHospital] = useState();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState('add hospital');

  const { store } = useMedicalContext();
  const { patientId } = store;
  const navigate = useNavigate();

  // When component renders, retrieve patient's visit details
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('patientId', patientId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/patient-data-visit-details?${data.toString()}`)
      .then((response) => {
        const { chaperones, clinics, fullName } = response.data;
        setClinicsArr(clinics);
        setChaperonesArr(chaperones);
        setName(fullName);
      });
  }, []);

  const openAddHospitalTruncatedPopup = () => {
    setOpen(true);
    setModal('add hospital');
  };

  const openAddDeptPopup = (hosp) => {
    setHospital(hosp);
    setOpen(true);
    setModal('add department');
  };

  const openAddChapPopup = () => {
    setOpen(true);
    setModal('add chaperone');
  };

  const closePopup = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: { xs: '300px', sm: '500px' }, mb: '70px' }}>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
      >
        <BackIcon variant="contained" onClick={() => navigate('/patient')} />
        <Typography variant="h1">
          {name}
        </Typography>
      </Stack>
      <Stack
        id="For Clinics + Chaperone"
        spacing={2}
      >
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <Typography variant="h1">
            Chaperones
          </Typography>
          <Tooltip title="Add New Chaperone">
            <IconButton onClick={openAddChapPopup}>
              <AddCircleRoundedIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Card sx={{ maxHeight: '100px', overflow: 'auto' }}>
          <CardContent>
            {
        chaperonesArr === undefined
          ? <div />
          : (

            <div>
              {chaperonesArr.length === 0 && (
              <Typography variant="body1">
                Add contacts who are likely to chaperone this patient
              </Typography>
              )}
              {chaperonesArr.map((chaperone) => (
                <div>
                  {`${chaperone.name}`}
                  <br />
                </div>
              ))}
            </div>

          )
      }
          </CardContent>
        </Card>
        {
        clinicsArr === undefined
          ? (
            <div />
          )
          : (

            <Stack
              id="For Clinics"
              spacing={2}
            >
              <Stack
                direction="row"
                spacing={1}
              >
                <Typography variant="h1">
                  Clinics & Departments
                </Typography>
                <Tooltip title="Add New Hospital" arrow>
                  <IconButton aria-label="Add new hospital" color="primary" onClick={openAddHospitalTruncatedPopup}>
                    <AddCircleRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack
                id="list of clinics"
                spacing={2}
              >
                {clinicsArr.map((clinic) => (
                  <Grid item sm={12}>
                    <Card key={clinic.hospital}>
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="h2">
                            {clinic.hospital}
                          </Typography>
                          <Tooltip title="Add New Department">
                            <AddCircleRoundedIcon color="secondary" onClick={() => openAddDeptPopup(clinic.hospital)} />
                          </Tooltip>
                        </Stack>
                        {clinic.departments.length === 0 && (
                        <Typography variant="body1">
                          You have no departments at the moment.
                        </Typography>
                        )}
                        {clinic.departments.map((department) => (
                          <Typography variant="body1">
                            {`${department}`}
                          </Typography>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Stack>

            </Stack>
          )
      }

      </Stack>
      <Modal
        open={open}
        onClose={closePopup}
      >
        <Box sx={style}>
          {
          modal === 'add hospital'
            ? <AddHospitalTruncated name={name} setClinicsArr={setClinicsArr} />
            : modal === 'add department'
              ? <AddDepartmentTruncated hospital={hospital} name={name} setClinicsArr={setClinicsArr} />
              : <AddChaperoneTruncated setChaperonesArr={setChaperonesArr} name={name} />
           }
        </Box>
      </Modal>
    </Box>
  );
}

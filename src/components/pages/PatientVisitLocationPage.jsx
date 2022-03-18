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
import { Button, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import { useMedicalContext } from '../others/store';
import AddHospitalTruncated from '../organisms/AddHospitalTruncated';
import AddDepartmentTruncated from '../organisms/AddDepartmentTruncated';
import AddChaperoneTruncated from '../organisms/AddChaperoneTruncated';

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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
        console.log(chaperones, clinics);
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
    <div>
      <Button variant="contained" onClick={() => navigate('/patient')}>Back</Button>
      <br />
      <br />

      {
        clinicsArr === undefined
          ? (
            <div />
          )
          : (

            <div>
              <strong>
                List of
                {' '}
                {name}
                's Clinics and Departments
              </strong>
              <Tooltip title="Add New Hospital">
                <AddCircleIcon variant="contained" onClick={openAddHospitalTruncatedPopup} />
              </Tooltip>
              <br />
              <br />
              <div>
                {clinicsArr.map((clinic) => (
                  <div>
                    <strong>
                      {' '}
                      {`${clinic.hospital}`}
                    </strong>
                    <Tooltip title="Add New Department">
                      <AddCircleIcon variant="contained" onClick={() => openAddDeptPopup(clinic.hospital)} />
                    </Tooltip>
                    {clinic.departments.map((department) => (
                      <div>
                        {`${department}`}
                      </div>
                    ))}
                    <br />
                    <br />
                  </div>
                ))}
              </div>

            </div>
          )
      }
      {
        chaperonesArr === undefined
          ? <div />
          : (
            <div>
              <strong>
                List of
                {' '}
                {name}
                's Chaperones
              </strong>
              <Tooltip title="Add New Chaperone">
                <AddCircleIcon variant="contained" onClick={openAddChapPopup} />
              </Tooltip>
              <br />
              <div>
                {chaperonesArr.map((chaperone) => (
                  <div>
                    {`${chaperone.name}`}
                    <br />
                  </div>
                ))}
              </div>
            </div>
          )
      }
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
    </div>
  );
}

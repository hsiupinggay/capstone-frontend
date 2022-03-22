import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import AddAppointment from '../organisms/AddAppointment';
import ApptFilterCheckbox from '../atoms/ApptFilterCheckbox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function AddApptModal({ openApptModal, setOpenApptModal }) {
  const handleClose = () => {
    setOpenApptModal(false);
  };
  return (
    <div>
      <Modal
        open={openApptModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={
          {
            ...style, width: 400, height: 500, flexDirection: 'column',
          }
        }
        >
          <h1>Add Appointment</h1>
          <AddAppointment />
        </Box>
      </Modal>
    </div>
  );
}

function FilterModal({ openApptModal, setOpenApptModal, setFilterData, filterParams, filterData }) {
  const [hospitalFilter, setHospitalFilter] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState(null);
  const [patientFilter, setPatientFilter] = useState(null);
  const [chaperoneFilter, setChaperoneFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [filterValue, setFilterValue] = useState({});
  const handleClose = () => {
    setOpenApptModal(false);
    setHospitalFilter(null);
    setDepartmentFilter(null);
    setPatientFilter(null);
    setChaperoneFilter(null);
    setDateFilter(null);
  };

  // useEffect on filterValue change (only happens within checkbox components)
  // switch case to identify which filter the change is made on
  useEffect(() => {
    switch (Object.keys(filterValue)[0]) {
      case 'hospital':
        setHospitalFilter(Object.values(filterValue)[0]);
        break;
      case 'department':
        setDepartmentFilter(Object.values(filterValue)[0]);
        break;
      case 'patient':
        setPatientFilter(Object.values(filterValue)[0]);
        break;
      case 'chaperone':
        setChaperoneFilter(Object.values(filterValue)[0]);
        break;
      case 'date':
        setDateFilter(Object.values(filterValue)[0]);
        break;
      default:
        break;
    }
  }, [filterValue]);

  // Function to set the filters chosen
  const submitFilters = () => {
    setFilterData({
      hospitalFilter,
      departmentFilter,
      patientFilter,
      chaperoneFilter,
      dateFilter,
    })
  }
  // useEffect after filter data is updated
  useEffect(() => {
    handleClose();
  }, [filterData])


  return (
    <div>
      <Modal
        open={openApptModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={
          {
            ...style, width: 600, height: 500, flexDirection: 'column',
          }
        }
        >
          <h1>Apply Filters</h1>
          <ApptFilterCheckbox label="Hospital" dataArray={filterParams.hospitals} filterValue={filterValue} setFilterValue={setFilterValue} />
          <ApptFilterCheckbox label="Department" dataArray={filterParams.departments} filterValue={filterValue} setFilterValue={setFilterValue} />
          <ApptFilterCheckbox label="Patient" dataArray={filterParams.patients} filterValue={filterValue} setFilterValue={setFilterValue} />
          <ApptFilterCheckbox label="Chaperone" dataArray={filterParams.chaperones} filterValue={filterValue} setFilterValue={setFilterValue} />
          <ApptFilterCheckbox label="Date" dataArray={filterParams.dates} filterValue={filterValue} setFilterValue={setFilterValue} />
          <Button onClick={submitFilters}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>
  );
}

function TestModal({ openApptModal, setOpenApptModal }) {
  const handleClose = () => {
    setOpenApptModal(false);
  };

  return (
    <div>
      <Modal
        open={openApptModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a default modal</h2>
          <p id="parent-modal-description">
            There is an error, you should not be seeing this!
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}

export default function ApptModal(
  {
    openApptModal, setOpenApptModal, apptModalType, setFilterData, filterParams, filterData
  },
) {
  switch (apptModalType) {
    case 'add-appt':
      return <AddApptModal openApptModal={openApptModal} setOpenApptModal={setOpenApptModal} />;
    case 'edit':
      break;
    case 'filter':
      return (
        <FilterModal
          openApptModal={openApptModal}
          setOpenApptModal={setOpenApptModal}
          setFilterData={setFilterData}
          filterParams={filterParams}
          filterData={filterData}
        />
      );
    default:
      return <TestModal openApptModal={openApptModal} setOpenApptModal={setOpenApptModal} />;
  }
}
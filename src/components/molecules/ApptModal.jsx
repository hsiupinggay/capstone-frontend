/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import AddDetailsTabs from '../organisms/AddDetailsTabs';
import AddAppointment from '../organisms/AddAppointment';
import ApptFilterCheckbox from '../atoms/ApptFilterCheckbox';
import AppointmentDetailPopup from '../organisms/AppointmentDetailPopup';

const style = {
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
};

function AppointmentDetailModal({
  openApptModal, setOpenApptModal, setDisplayDataArray, apptPopupDetails,
  setAnchorEl,
}) {
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
          <AppointmentDetailPopup setOpenApptModal={setOpenApptModal} setDisplayDataArray={setDisplayDataArray} apptPopupDetails={apptPopupDetails} setAnchorEl={setAnchorEl} />
        </Box>
      </Modal>
    </div>
  );
}

function AddDetailsModal({
  openApptModal, setOpenApptModal, setAddition, addition, setModal,
}) {
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
          <AddDetailsTabs addition={addition} setAddition={setAddition} setModal={setModal} />
        </Box>
      </Modal>
    </div>
  );
}

function AddApptModal({
  openApptModal, setOpenApptModal, setModal, setAddition, setDisplayDataArray,
}) {
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
            ...style, width: 450, height: 500, flexDirection: 'column', overflow: 'scroll',
          }
        }
        >

          <AddAppointment setAddition={setAddition} setModal={setModal} setOpenApptModal={setOpenApptModal} setDisplayDataArray={setDisplayDataArray} />
        </Box>
      </Modal>
    </div>
  );
}

function FilterModal({
  openApptModal, setOpenApptModal, setFilterData, filterParams, filterData,
}) {
  const [hospitalFilter, setHospitalFilter] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [patientFilter, setPatientFilter] = useState([]);
  const [chaperoneFilter, setChaperoneFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [filterValue, setFilterValue] = useState({});
  const handleClose = () => {
    setOpenApptModal(false);
    setHospitalFilter([]);
    setDepartmentFilter([]);
    setPatientFilter([]);
    setChaperoneFilter([]);
    setDateFilter([]);
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
    });
  };
  // useEffect after filter data is updated
  useEffect(() => {
    handleClose();
  }, [filterData]);

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
            ...style, width: { xxs: '80vw', sm: 450 }, height: 500, flexDirection: 'column',
          }
        }
        >
          <Typography variant="h3" sx={{ fontSize: { xs: 10, sm: 14, md: 18 }, marginLeft: 17 }}>Apply Filters</Typography>
          <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
          >
            <ApptFilterCheckbox label="Hospital" dataArray={filterParams.hospitals} setFilterValue={setFilterValue} />
            <ApptFilterCheckbox label="Department" dataArray={filterParams.departments} setFilterValue={setFilterValue} />
            <ApptFilterCheckbox label="Patient" dataArray={filterParams.patients} setFilterValue={setFilterValue} />
            <ApptFilterCheckbox label="Chaperone" dataArray={filterParams.chaperones} setFilterValue={setFilterValue} />
            <ApptFilterCheckbox label="Date" dataArray={filterParams.dates} setFilterValue={setFilterValue} />
          </Box>
          <Button variant="contained" sx={{ marginTop: 4, marginLeft: 18 }} onClick={submitFilters}>Submit</Button>
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
    openApptModal, setOpenApptModal, apptModalType, setFilterData, filterParams, filterData, setApptModalType, setDisplayDataArray, apptPopupDetails, setAnchorEl,
  },
) {
  const [addition, setAddition] = useState(false);

  switch (apptModalType) {
    case 'add-appt':
      return <AddApptModal openApptModal={openApptModal} setOpenApptModal={setOpenApptModal} setModal={setApptModalType} setAddition={setAddition} setDisplayDataArray={setDisplayDataArray} />;
    case 'add-category':
      return <AddDetailsModal openApptModal={openApptModal} addition={addition} setAddition={setAddition} setModal={setApptModalType} setOpenApptModal={setOpenApptModal} />;
    case 'view-full-appointment':
      return (
        <AppointmentDetailModal
          setDisplayDataArray={setDisplayDataArray}
          openApptModal={openApptModal}
          setOpenApptModal={setOpenApptModal}
          apptPopupDetails={apptPopupDetails}
          setAnchorEl={setAnchorEl}
        />
      );
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

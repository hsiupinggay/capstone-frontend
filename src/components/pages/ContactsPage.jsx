/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-console */
/*
 * ========================================================
 * ========================================================
 *
 *                       Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar, Modal, Box, Typography, IconButton, Stack, Grid, List, ListItem,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { getNameInitials } from '../others/helper';
import { useMedicalContext, setTexteeAction } from '../others/store';
import AddContact from '../organisms/AddContact';
import ContactVisibility from '../organisms/ContactVisibility';
import ContactRequests from '../organisms/ContactRequests';
import styles from './ContactsPageCss';
import PatientListPage from '../organisms/PatientList';

/*
 * ========================================================
 * ========================================================
 *
 *               ContactsPage Component
 *
 * ========================================================
 * ========================================================
 */
export default function ContactsPage() {
  const [contactsList, setContactsList] = useState();
  const [incomingRequestsList, setIncomingRequestsList] = useState();
  const [outgoingRejList, setOutgoingRejList] = useState();
  const [outgoingAcceptedList, setOutgoingAcceptedList] = useState();
  const [outgoingPendingList, setOutgoingPendingList] = useState();
  const [contactId, setContactId] = useState();
  const [contactName, setContactName] = useState();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState('add contact');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const requestOpen = Boolean(anchorEl);

  const { store, dispatch } = useMedicalContext();
  const { userId } = store;
  const navigate = useNavigate();

  // For request menu drop
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openAddContactPopup = () => {
    setOpen(true);
    setModal('add contact');
  };

  const openContactVisibilityPopup = (id, name) => {
    setContactName(name);
    setContactId(id);
    setOpen(true);
    setModal('open contact');
  };

  const closeAddContactPopup = () => {
    setOpen(false);
  };

  const openChat = (id, firstName, lastName, photo) => {
    const data = {
      id, firstName, lastName, photo,
    };
    dispatch(setTexteeAction(data));
    navigate('/chat');
  };

  // When component renders, retrieve all contacts and patients data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/load-page?${data.toString()}`)
      .then((response) => {
        const {
          allContacts, incomingRequests, outgoingRequestsRejected, outgoingRequestsAccepted, outgoingRequestsPending,
        } = response.data;
        setContactsList(allContacts.contacts);
        setIncomingRequestsList(incomingRequests);
        setOutgoingPendingList(outgoingRequestsPending);
        setOutgoingAcceptedList(outgoingRequestsAccepted);
        setOutgoingRejList(outgoingRequestsRejected);
      });
  }, []);

  // When user dismisses notification, remove from DB and rerender latest notifcation list
  const dismissNotification = (notificationId, status) => {
    const data = {
      userId,
      notificationId,
      status,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/contacts/dismiss-notification`, data)
      .then((result) => {
        const { updatedRequests } = result.data;
        if (status === 'accepted') {
          setOutgoingAcceptedList(updatedRequests);
        } else {
          setOutgoingRejList(updatedRequests);
        }
      });
  };

  // When user accepts/rejects request, make changes in DB and rerender page
  const handleRequest = (notificationId, status, senderId, firstName, lastName, photo) => {
    const data = {
      userId,
      notificationId,
      status,
      senderId,
      firstName,
      lastName,
      photo,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/contacts/handle-request`, data)
      .then((response) => {
        if (status === 'accepted') {
          const { allContacts, incomingRequests } = response.data;
          setContactsList(allContacts.contacts);
          setIncomingRequestsList(incomingRequests);
        } else {
          const { incomingRequests } = response.data;
          setIncomingRequestsList(incomingRequests);
        }
      });
  };
  return (
    <Stack
      spacing={2}
    >
      <Box sx={{ width: '300px' }}>
        {
        contactsList === undefined
          ? (
            <div />
          )
          : (
            <Box>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Tooltip title="Go Back" arrow>
                  <IconButton>
                    <ArrowCircleLeftIcon fontSize="large" color="primary" variant="contained" onClick={() => navigate('/home')} />
                  </IconButton>
                </Tooltip>
                <Typography variant="h1">
                  Contacts
                </Typography>
                <Tooltip arrow title="Add New Contact">
                  <IconButton onClick={openAddContactPopup}>
                    <AddCircleIcon sx={styles.bigIcon} />
                  </IconButton>
                </Tooltip>
                <ContactRequests
                  incomingRequestsList={incomingRequestsList}
                  outgoingRejList={outgoingRejList}
                  outgoingAcceptedList={outgoingAcceptedList}
                  outgoingPendingList={outgoingPendingList}
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  requestOpen={requestOpen}
                  handleRequest={handleRequest}
                  handleClick={handleClick}
                  dismissNotification={dismissNotification}
                />
              </Stack>

              <Stack
                spacing={1}
                height="400px"
                overflow="auto"
              >
                {contactsList.map((contact) => (
                  <Grid item sx={12}>
                    <List sx={{ bgcolor: '#ffffff' }}>
                      <ListItem>
                        <Stack
                          spacing={2}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          width="100%"
                        >
                          {' '}
                          {!contact.photo && <Avatar sx={styles.avatar}>{getNameInitials(contact.firstName, contact.lastName)}</Avatar>}
                          {contact.photo && <Avatar sx={styles.avatar} alt="profile" src={contact.photo} />}
                          <Typography variant="body1">
                            {`${contact.firstName} ${contact.lastName}`}
                          </Typography>
                          <Stack
                            spacing={1}
                            direction="row"
                          >
                            <Tooltip arrow title="Patient Access">
                              <VisibilityIcon sx={styles.icon} onClick={() => openContactVisibilityPopup(contact.contactId, `${contact.firstName} ${contact.lastName}`)} />
                            </Tooltip>
                            <Tooltip arrow title="Chat">
                              <ChatIcon sx={styles.icon} onClick={() => openChat(contact.contactId, contact.firstName, contact.lastName, contact.photo)} />
                            </Tooltip>
                          </Stack>
                        </Stack>
                      </ListItem>
                    </List>
                  </Grid>
                ))}
              </Stack>
            </Box>
          )
      }
      </Box>
      <Box sx={{ width: '300px' }}>
        <PatientListPage />
      </Box>
      <Modal
        open={open}
        onClose={closeAddContactPopup}
      >
        <Box sx={styles.modalStyle}>
          {
          modal === 'add contact'
            ? <AddContact setOutgoingPendingList={setOutgoingPendingList} />
            : <ContactVisibility contactId={contactId} contactName={contactName} />
           }
        </Box>
      </Modal>
    </Stack>
  );
}

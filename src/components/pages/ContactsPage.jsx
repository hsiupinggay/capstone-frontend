/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
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
  Avatar, Button, Modal, Box, Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { getNameInitials } from '../others/helper';
import { useMedicalContext, setTexteeAction } from '../others/store';
import AddContact from '../organisms/AddContact';
import ContactVisibility from '../organisms/ContactVisibility';

/*
 * ========================================================
 * ========================================================
 *
 *                   Modal styling
 *
 * ========================================================
 * ========================================================
 */
const modalStyle = {
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
  display: 'flex',
  justifyContent: 'center',
  // alignItems: 'center',
};

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

  const { store, dispatch } = useMedicalContext();
  const { userId } = store;
  const navigate = useNavigate();

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
    <div>
      {
        contactsList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <Typography variant="h2">
                {' '}
                Your Contacts
                <Tooltip title="Add New Contact">
                  <AddCircleIcon variant="contained" onClick={openAddContactPopup} />
                </Tooltip>
              </Typography>
              <br />
              {contactsList.map((contact) => (
                <div>
                  <Typography variant="h4">

                    {`${contact.firstName} ${contact.lastName}`}
                  </Typography>
                  {!contact.photo && <Avatar sx={{ width: 60, height: 60 }}>{getNameInitials(contact.firstName, contact.lastName)}</Avatar>}
                  {contact.photo && <Avatar sx={{ width: 60, height: 60 }} alt="profile" src={contact.photo} />}
                  <Tooltip title="Control Contact Permission">
                    <VisibilityIcon variant="contained" onClick={() => openContactVisibilityPopup(contact.contactId, `${contact.firstName} ${contact.lastName}`)} />
                  </Tooltip>
                  <Tooltip title="Chat">
                    <ChatIcon variant="contained" onClick={() => openChat(contact.contactId, contact.firstName, contact.lastName, contact.photo)} />
                  </Tooltip>
                </div>
              ))}
            </div>
          )
      }
      <br />
      <br />
      {
        incomingRequestsList === undefined
          ? (

            <div />
          )
          : (
            <div>
              <Typography variant="h2">Requests</Typography>
              <br />
              {incomingRequestsList.map((request) => (
                <div>
                  {`${request.sender.firstName} ${request.sender.lastName}`}
                  {' '}
                  wants to add you!
                  {!request.sender.photo && <Avatar sx={{ width: 60, height: 60 }}>{getNameInitials(request.sender.firstName, request.sender.lastName)}</Avatar>}
                  {request.sender.photo && <Avatar sx={{ width: 60, height: 60 }} alt="profile" src={request.sender.photo} />}
                  <Button onClick={() => handleRequest(request._id, 'accepted', request.sender.senderId, request.sender.firstName, request.sender.lastName, request.sender.photo)}>Accept</Button>
                  <Button variant="contained" onClick={() => handleRequest(request._id, 'rejected')}>Reject</Button>
                </div>
              ))}
            </div>
          )
      }
      <br />
      <br />
      {
        outgoingPendingList === undefined
          ? (
            <div>
              <Typography variant="h3">Sent Requests</Typography>
            </div>
          )
          : (
            <div>
              <Typography variant="h3">Sent Requests</Typography>
              <br />
              {outgoingPendingList.map((request) => (
                <div>
                  Your request to
                  {' '}
                  {`${request.recipient.firstName} ${request.recipient.lastName}`}
                  {' '}
                  is pending.
                  {!request.recipient.photo && <Avatar sx={{ width: 60, height: 60 }}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                  {request.recipient.photo && <Avatar sx={{ width: 60, height: 60 }} alt="profile" src={request.recipient.photo} />}

                </div>
              ))}
            </div>
          )
      }
      <br />
      <br />
      {
        outgoingAcceptedList === undefined
          ? (
            <div>
              <Typography variant="h3">Accepted Requests</Typography>
            </div>
          )
          : (
            <div>
              <Typography variant="h3">Accepted Requests</Typography>
              <br />
              {outgoingAcceptedList.map((request) => (
                <div>
                  {`${request.recipient.firstName} ${request.recipient.lastName}`}
                  {' '}
                  accepted your request!
                  {!request.recipient.photo && <Avatar sx={{ width: 60, height: 60 }}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                  {request.recipient.photo && <Avatar sx={{ width: 60, height: 60 }} alt="profile" src={request.recipient.photo} />}
                  <Button variant="contained" onClick={() => dismissNotification(request._id, 'accepted')}>Dismiss</Button>
                </div>
              ))}
            </div>
          )
      }
      <br />
      <br />
      {
        outgoingRejList === undefined
          ? (
            <div>
              <Typography variant="h3">Rejected Requests</Typography>
            </div>
          )
          : (
            <div>
              <Typography variant="h3">Rejected Requests</Typography>
              <br />
              {outgoingRejList.map((request) => (
                <div>
                  {`${request.recipient.firstName} ${request.recipient.lastName}`}
                  {' '}
                  declined your request.
                  {!request.recipient.photo && <Avatar sx={{ width: 60, height: 60 }}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                  {request.recipient.photo && <Avatar sx={{ width: 60, height: 60 }} alt="profile" src={request.recipient.photo} />}
                  <Button variant="contained" onClick={() => dismissNotification(request._id, 'rejected')}>Dismiss</Button>
                </div>
              ))}
            </div>
          )
      }
      <Modal
        open={open}
        onClose={closeAddContactPopup}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {
          modal === 'add contact'
            ? <AddContact setOutgoingPendingList={setOutgoingPendingList} />
            : <ContactVisibility contactId={contactId} contactName={contactName} />
           }
        </Box>
      </Modal>
    </div>
  );
}

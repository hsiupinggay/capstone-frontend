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
  Avatar, Button, Modal, Box,
} from '@mui/material';
import { getNameInitials } from '../others/helper';
import { useMedicalContext } from '../others/store';
import AddContact from '../organisms/AddContact';

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
  const { store } = useMedicalContext();
  const { userId } = store;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // When component renders, retrieve all contacts and patients data related to user
  useEffect(() => {
    const data = new URLSearchParams();
    data.append('userId', userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/load-page?${data.toString()}`)
      .then((result) => {
        const {
          allContacts, incomingRequests, outgoingRequestsRejected, outgoingRequestsAccepted, outgoingRequestsPending,
        } = result.data;
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
      .then((result) => {
        if (status === 'accepted') {
          const { allContacts, incomingRequests } = result.data;
          setContactsList(allContacts.contacts);
          setIncomingRequestsList(incomingRequests);
        } else {
          const { incomingRequests } = result.data;
          setIncomingRequestsList(incomingRequests);
        }
      });
  };

  return (
    <div>
      <strong>
        Contacts Page
      </strong>
      <br />

      <br />
      <br />
      {
        contactsList === undefined
          ? (
            <div>
              <strong>
                Your Contacts
                <Button variant="contained" onClick={handleOpen}>Add New Contact</Button>
              </strong>
            </div>
          )
          : (
            <div>
              <strong>
                {' '}
                Your Contacts
                <Button variant="contained" onClick={handleOpen}>Add New Contact</Button>
              </strong>
              <br />
              {contactsList.map((contact) => (
                <div>
                  {`${contact.firstName} ${contact.lastName}`}
                  {!contact.photo && <Avatar sx={{ width: 60, height: 60 }}>{getNameInitials(contact.firstName, contact.lastName)}</Avatar>}
                  {contact.photo && <Avatar sx={{ width: 60, height: 60 }} alt="profile" src={contact.photo} />}
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
            <div>
              <strong>Requests</strong>
            </div>
          )
          : (
            <div>
              <strong>Requests</strong>
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
              <strong>Sent Requests</strong>
            </div>
          )
          : (
            <div>
              <strong>Sent Requests</strong>
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
              <strong>Accepted Requests</strong>
            </div>
          )
          : (
            <div>
              <strong>Accepted Requests</strong>
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
              <strong>Rejected Requests</strong>
            </div>
          )
          : (
            <div>
              <strong>Rejected Requests</strong>
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
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddContact />
        </Box>
      </Modal>
    </div>
  );
}

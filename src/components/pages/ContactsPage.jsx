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
  Avatar, Button, Modal, Box, Typography, Badge,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { getNameInitials } from '../others/helper';
import { useMedicalContext, setTexteeAction } from '../others/store';
import AddContact from '../organisms/AddContact';
import ContactVisibility from '../organisms/ContactVisibility';
import contactPageStyles from './ContactsPageCss';

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
    <Box sx={contactPageStyles.pageContainer}>
      {
        contactsList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <Box sx={contactPageStyles.titleContainer}>
                <Typography sx={contactPageStyles.title}>
                  {' '}
                  Your Contacts
                </Typography>
                <Tooltip arrow title="Add New Contact">
                  <AddCircleIcon variant="contained" sx={contactPageStyles.addIcon} onClick={openAddContactPopup} />
                </Tooltip>
              </Box>
              <br />
              <Box sx={contactPageStyles.allContactsContainer}>
                {contactsList.map((contact) => (
                  <Box sx={contactPageStyles.contactContainer}>
                    <Typography sx={contactPageStyles.contactName}>
                      {`${contact.firstName} ${contact.lastName}`}
                    </Typography>
                    {!contact.photo && <Avatar sx={contactPageStyles.avatar}>{getNameInitials(contact.firstName, contact.lastName)}</Avatar>}
                    {contact.photo && <Avatar sx={contactPageStyles.avatar} alt="profile" src={contact.photo} />}
                    <Box sx={contactPageStyles.iconContainer}>
                      <Tooltip arrow title="Control Contact Permission">
                        <VisibilityIcon sx={contactPageStyles.icon} variant="contained" onClick={() => openContactVisibilityPopup(contact.contactId, `${contact.firstName} ${contact.lastName}`)} />
                      </Tooltip>
                      <Tooltip arrow title="Chat">
                        <ChatIcon variant="contained" sx={contactPageStyles.icon} onClick={() => openChat(contact.contactId, contact.firstName, contact.lastName, contact.photo)} />
                      </Tooltip>
                    </Box>

                  </Box>
                ))}
              </Box>
            </div>
          )
      }
      <br />
      <Box sx={contactPageStyles.titleContainer}>
        <Typography sx={contactPageStyles.title}>Requests</Typography>
      </Box>
      <br />
      <Box sx={contactPageStyles.requestsContainer}>
        {
        incomingRequestsList === undefined
          ? (

            <div />
          )
          : (
            <div>
              <Typography sx={contactPageStyles.smallTitle}>Incoming Requests</Typography>
              <Box sx={contactPageStyles.outGoingContainer}>
                {incomingRequestsList.map((request) => (
                  <Box sx={contactPageStyles.smallContactContainer}>
                    <Typography sx={contactPageStyles.smallContactName}>
                      {`${request.sender.firstName} ${request.sender.lastName}`}
                    </Typography>
                    <Box sx={contactPageStyles.secondRowContainer}>
                      {!request.sender.photo && <Avatar sx={contactPageStyles.smallAvatar}>{getNameInitials(request.sender.firstName, request.sender.lastName)}</Avatar>}
                      {request.sender.photo && <Avatar sx={contactPageStyles.smallAvatar} alt="profile" src={request.sender.photo} />}
                      <Box sx={contactPageStyles.iconsContainer}>
                        <Tooltip arrow title="Accept" placement="top">
                          <DoneIcon onClick={() => handleRequest(request._id, 'accepted', request.sender.senderId, request.sender.firstName, request.sender.lastName, request.sender.photo)} sx={contactPageStyles.acceptIcon} />
                        </Tooltip>
                        <Tooltip arrow title="Reject">
                          <CloseIcon variant="contained" onClick={() => handleRequest(request._id, 'rejected')} sx={contactPageStyles.rejectIcon} />
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </div>
          )
      }
        <br />
        <br />
        {
        outgoingPendingList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <Typography sx={contactPageStyles.smallTitle}>Sent Requests</Typography>
              <Box sx={contactPageStyles.outGoingContainer}>
                {outgoingPendingList.map((request) => (
                  <Box sx={contactPageStyles.smallContactContainer}>
                    {!request.recipient.photo && <Avatar sx={contactPageStyles.smallAvatar}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                    {request.recipient.photo && <Avatar sx={contactPageStyles.smallAvatar} alt="profile" src={request.recipient.photo} />}
                    <Typography sx={contactPageStyles.smallContactName}>
                      {`${request.recipient.firstName} ${request.recipient.lastName}`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </div>

          )
      }
        <br />
        <br />
        {
        outgoingAcceptedList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <Typography sx={contactPageStyles.smallTitle}>Accepted Requests</Typography>
              <Box sx={contactPageStyles.outGoingContainer}>
                {outgoingAcceptedList.map((request) => (
                  <Box sx={contactPageStyles.smallContactContainer}>
                    <Typography sx={contactPageStyles.smallContactName}>
                      {`${request.recipient.firstName} ${request.recipient.lastName}`}
                    </Typography>

                    {!request.recipient.photo && <Avatar sx={contactPageStyles.smallAvatar}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                    {request.recipient.photo && <Avatar sx={contactPageStyles.smallAvatar} alt="profile" src={request.recipient.photo} />}
                    <Button variant="contained" onClick={() => dismissNotification(request._id, 'accepted')}>Dismiss</Button>
                  </Box>
                ))}
              </Box>
            </div>
          )
      }
        <br />
        <br />
        {
        outgoingRejList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <Typography sx={contactPageStyles.smallTitle}>Rejected Requests</Typography>
              <Box sx={contactPageStyles.outGoingContainer}>
                {outgoingRejList.map((request) => (
                  <Box sx={contactPageStyles.smallContactContainer}>
                    <Typography sx={contactPageStyles.smallContactName}>
                      {`${request.recipient.firstName} ${request.recipient.lastName}`}
                    </Typography>
                    {!request.recipient.photo && <Avatar sx={contactPageStyles.smallAvatar}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                    {request.recipient.photo && <Avatar sx={contactPageStyles.smallAvatar} alt="profile" src={request.recipient.photo} />}
                    <Button variant="contained" onClick={() => dismissNotification(request._id, 'rejected')}>Dismiss</Button>
                  </Box>
                ))}
              </Box>
            </div>
          )
      }
      </Box>

      <Modal
        open={open}
        onClose={closeAddContactPopup}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={contactPageStyles.modalStyle}>
          {
          modal === 'add contact'
            ? <AddContact setOutgoingPendingList={setOutgoingPendingList} />
            : <ContactVisibility contactId={contactId} contactName={contactName} />
           }
        </Box>
      </Modal>
    </Box>
  );
}

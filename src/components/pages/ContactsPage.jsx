/* eslint-disable no-underscore-dangle */
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
  Avatar, Modal, Box, Typography, Badge, IconButton, Stack, Card, CardContent, Menu, ListItemText, ListItemAvatar, Divider, MenuItem,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { getNameInitials } from '../others/helper';
import { useMedicalContext, setTexteeAction } from '../others/store';
import AddContact from '../organisms/AddContact';
import ContactVisibility from '../organisms/ContactVisibility';
import styles from './ContactsPageCss';

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
  console.log('<== incomingRequestsList ==>', incomingRequestsList);
  return (
    <Box sx={styles.mainContainer}>
      {
        contactsList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h1">
                  Your Contacts
                </Typography>
                <Tooltip arrow title="Add New Contact">
                  <IconButton onClick={openAddContactPopup}>
                    <AddCircleIcon sx={styles.bigIcon} />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Stack
                spacing={1}
              >
                {contactsList.map((contact) => (
                  <Card sx={styles.card}>
                    <CardContent>
                      <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {' '}
                        {!contact.photo && <Avatar sx={styles.avatar}>{getNameInitials(contact.firstName, contact.lastName)}</Avatar>}
                        {contact.photo && <Avatar sx={styles.avatar} alt="profile" src={contact.photo} />}
                        <Typography variant="body2">
                          {`${contact.firstName} ${contact.lastName}`}
                        </Typography>

                        <Stack
                          spacing={1}
                          justifyContent="center"
                        >
                          <Tooltip arrow title="Patient Access">
                            <VisibilityIcon sx={styles.icon} onClick={() => openContactVisibilityPopup(contact.contactId, `${contact.firstName} ${contact.lastName}`)} />
                          </Tooltip>
                          <Tooltip arrow title="Chat">
                            <ChatIcon sx={styles.icon} onClick={() => openChat(contact.contactId, contact.firstName, contact.lastName, contact.photo)} />
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </div>
          )
      }
      <Stack
        spacing={1}
      >
        <Box>
          <IconButton
            id="basic-button"
            aria-controls={requestOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={requestOpen ? 'true' : undefined}
            onClick={handleClick}
            sx={styles.bigIcon}
          >
            <NotificationsRoundedIcon sx={styles.bigIcon} />
          </IconButton>
          <Box sx={styles.dropdown}>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={requestOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {
        incomingRequestsList === undefined
          ? (
            <div />
          )
          : (
            <div>

              <MenuItem>
                <ListItemText primary="Incoming Requests" />
              </MenuItem>
              {incomingRequestsList.map((request) => (
                <MenuItem>
                  <Stack
                    id="contact stack"
                    spacing={1}
                    direction="row"
                    alignItems="center"
                  >
                    <ListItemAvatar>
                      {!request.sender.photo && <Avatar sx={styles.smallAvatar}>{getNameInitials(request.sender.firstName, request.sender.lastName)}</Avatar>}
                      {request.sender.photo && <Avatar sx={styles.smallAvatar} alt="profile" src={request.sender.photo} />}
                    </ListItemAvatar>
                    <Stack
                      spacing={0}
                    >
                      <ListItemText>
                        {`${request.sender.firstName} ${request.sender.lastName}`}
                      </ListItemText>
                    </Stack>
                    <Box sx={styles.iconsContainer}>
                      <Tooltip arrow title="Accept" placement="top">
                        <CheckCircleIcon onClick={() => handleRequest(request._id, 'accepted', request.sender.senderId, request.sender.firstName, request.sender.lastName, request.sender.photo)} sx={styles.acceptIcon} />
                      </Tooltip>
                      <Tooltip arrow title="Reject">
                        <CancelIcon variant="contained" onClick={() => handleRequest(request._id, 'rejected')} sx={styles.rejectIcon} />
                      </Tooltip>
                    </Box>
                  </Stack>
                </MenuItem>
              ))}
            </div>
          )
      }
              <Divider />
              {
        outgoingPendingList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <MenuItem>
                <ListItemText>Sent Requests</ListItemText>
              </MenuItem>
              {outgoingPendingList.map((request) => (
                <MenuItem>
                  <ListItemAvatar>
                    {!request.recipient.photo && <Avatar sx={styles.smallAvatar}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                    {request.recipient.photo && <Avatar sx={styles.smallAvatar} alt="profile" src={request.recipient.photo} />}
                  </ListItemAvatar>
                  <ListItemText>
                    {`${request.recipient.firstName} ${request.recipient.lastName}`}
                  </ListItemText>

                </MenuItem>
              ))}
            </div>

          )
      }
              <Divider />
              {
        outgoingAcceptedList === undefined
          ? (
            <div />
          )
          : (
            <div>
              <MenuItem>
                <ListItemText primary="Notifications" />
              </MenuItem>
              {outgoingAcceptedList.map((request) => (
                <MenuItem>
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      onClick={() => dismissNotification(request._id, 'accepted')}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={(
                        <Tooltip arrow title="Accepted" placement="bottom">
                          <ThumbUpIcon color="primary" sx={styles.dismissAcceptIcon} />
                        </Tooltip>
                      )}
                      sx={styles.badge}
                    >
                      {!request.recipient.photo && <Avatar sx={styles.smallAvatar}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                      {request.recipient.photo && <Avatar sx={styles.smallAvatar} alt="profile" src={request.recipient.photo} />}
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText primary={`${request.recipient.firstName} ${request.recipient.lastName}`} />

                </MenuItem>
              ))}
              {
        outgoingRejList === undefined
          ? (
            <div />
          )
          : (
            <div>
              {outgoingRejList.map((request) => (
                <MenuItem>
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      onClick={() => dismissNotification(request._id, 'rejected')}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={(
                        <Tooltip arrow title="Dismiss" placement="bottom">
                          <ThumbDownIcon color="primary" sx={styles.dismissRejIcon} />
                        </Tooltip>
                      )}
                      sx={styles.badge}
                    >
                      {!request.recipient.photo && <Avatar sx={styles.smallAvatar}>{getNameInitials(request.recipient.firstName, request.recipient.lastName)}</Avatar>}
                      {request.recipient.photo && <Avatar sx={styles.smallAvatar} alt="profile" src={request.recipient.photo} />}
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText primary={`${request.recipient.firstName} ${request.recipient.lastName}`} />
                </MenuItem>
              ))}
            </div>
          )
      }

            </div>
          )
      }
            </Menu>
          </Box>
        </Box>
      </Stack>
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
    </Box>
  );
}

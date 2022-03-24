/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Avatar, Box, Badge, Stack, Menu, ListItemText, ListItemAvatar, Divider, MenuItem, Tooltip, IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import styles from '../pages/ContactsPageCss';
import { getNameInitials } from '../others/helper';

function ContactRequests({
  incomingRequestsList,
  outgoingRejList,
  outgoingAcceptedList,
  outgoingPendingList,
  handleClose,
  handleClick,
  anchorEl,
  requestOpen,
  handleRequest,
  dismissNotification,

}) {
  return (
    <div>
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
              {incomingRequestsList !== []
              && (
              <MenuItem>
                <ListItemText primary="Incoming Requests" />
              </MenuItem>
              )}
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
                    <Box>
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
              {outgoingPendingList !== []
              && (
              <MenuItem>
                <ListItemText>Sent Requests</ListItemText>
              </MenuItem>
              )}
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
              {outgoingAcceptedList !== [] && outgoingRejList !== []
              && (
              <MenuItem>
                <ListItemText primary="Notifications" />
              </MenuItem>
              )}
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
    </div>
  );
}

export default ContactRequests;

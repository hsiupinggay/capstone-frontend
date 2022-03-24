/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Typography, Box, Stack,
} from '@mui/material';
import { useMedicalContext } from '../others/store';
import BackIcon from '../molecules/BackIcon';
import TexterBubble from '../molecules/TexterBubble';
import TexteeBubble from '../molecules/TexteeBubble';
import MessageInput from '../molecules/MessageInput';
import chatStyles from './ChatRoomPageCss';

export default function ChatRoomPage() {
  // Establish socket connection upon entering room
  const socket = io.connect(`${process.env.REACT_APP_BACKEND_URL}`);

  const [conversation, setConversation] = useState();
  const [displayMessage, setDisplayMessage] = useState();

  const { store } = useMedicalContext();
  const {
    userId, texteeId, texteeFirstName, texteeLastName, texteePhoto,
  } = store;
  const navigate = useNavigate();

  const goBack = () => {
    // Go back to contacts list page
    navigate('/contacts');
  };

  const convertMessageArrToConverastion = (arr) => {
    const messageArr = arr.map((message) => (
      <div>
        {message.senderId === userId ? <TexterBubble text={message.message} time={message.createdAt} /> : <TexteeBubble text={message.message} time={message.createdAt} /> }
      </div>
    ));
    setConversation(messageArr);
  };

  // On page load do the following
  useEffect(() => {
    const data = {
      onlineUserId: userId,
      texteeId,
    };

    // On request from backend, send user data
    socket.on('Send data', () => {
      socket.emit('Sent data to backend', data);

      // Upon receiving textee data, display on browser
      socket.on('All messages', (sendData) => {
        const allMessagesArr = sendData.sendData.allMessages;
        convertMessageArrToConverastion(allMessagesArr);
      });
    });

    // Display latest conversation once received
    socket.on('Latest conversation', (allMessages) => {
      convertMessageArrToConverastion(allMessages.allMessages);
    });

    // If user leaves chat room, disconnect from socket so that their document is removed from Online Chat collection
    return () => {
      socket.disconnect();
    };
  }, []);

  // Callback to send message to DB
  const sendInfoToDB = () => {
    // Clear input field
    document.getElementById('message').value = '';

    const data = {
      message: displayMessage,
      senderId: userId,
      receiverId: texteeId,
    };

    // Send new message to backend
    socket.emit('Send message', data);

    // Display latest conversation once received
    socket.on('Latest conversation', (allMessages) => {
      convertMessageArrToConverastion(allMessages.allMessages);
    });
  };

  return (
    <Box sx={chatStyles.container}>
      <Box sx={chatStyles.header}>
        <BackIcon onClick={goBack} />
        <Avatar src={texteePhoto} alt="Textee photo" sx={chatStyles.avatar} />
        <Typography sx={chatStyles.name}>
          {texteeFirstName}
          {' '}
          {texteeLastName}
        </Typography>
      </Box>
      <Box sx={chatStyles.messageContainer}>
        <Stack
          spacing={1}
        >
          {conversation}
        </Stack>
      </Box>
      <MessageInput id="message" handleInput={(e) => setDisplayMessage(e.target.value)} handleSend={sendInfoToDB} />
    </Box>
  );
}

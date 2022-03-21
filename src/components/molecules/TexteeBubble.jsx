/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Typography } from '@mui/material';
import moment from 'moment-timezone';
import textStyles from './textBubbleCss';

function TexteeBubble({ text, time }) {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
      <Box
        component="div"
        sx={textStyles.texteeBubble}
      >
        <Box>
          <Typography sx={textStyles.textMessage}>
            {text}
          </Typography>
          <Typography sx={textStyles.timeStamp}>
            {moment(time).tz('Asia/Singapore').format('hh:mm a')}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default TexteeBubble;

/* eslint-disable react/prop-types */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import {
  CardContent, IconButton, Box, Tooltip, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

/*
 * ========================================================
 * ========================================================
 *
 *                TelegramCard Component
 *
 * ========================================================
 * ========================================================
 */
function TelegramCard({ patientId }) {
  const [tooltipText, setTooltipText] = useState('Copy');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(patientId);
      setTooltipText('Copied to Clipboad');
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage('Did not manage to copy, refresh the page or renavigate to this page again.');
    }
  };
  return (
    <CardContent>
      <Typography variant="h3">
        Subscribe to updates on Telegram
      </Typography>
      <Typography variant="body1">
        1. On Telegram, search for
        <br />
        <em>@medApp_reminder_bot</em>
      </Typography>
      <Typography variant="body1">
        2. Send
        {' '}
        <b>/start</b>
        , to the bot
      </Typography>
      <Typography variant="body1">
        3. Send
        {' '}
        <b>/patient</b>
        , the bot would prompt you for a patient id
      </Typography>
      <Typography variant="body1">
        4. Copy the below string and send it to the bot
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title={tooltipText} arrow>
          <IconButton onClick={handleCopy} color="primary">
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="body1">
        {patientId}
      </Typography>

      {error && (
      <Typography variant="body2" color="secondary">
        {errorMessage}
      </Typography>
      )}
    </CardContent>
  );
}

export default TelegramCard;

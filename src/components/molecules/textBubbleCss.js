const textStyles = {
  texterBubble: {
    display: 'inline',
    borderRadius: 3,
    p: 1,
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#dcf8cf'),
    boxShadow: '0 10px 6px -6px #777',
    marginRight: 2,
    maxWidth: {
      lg: 500,
      md: 400,
      sm: 300,
      xs: 200,
    },
    marginBottom: 0.5,
  },

  texteeBubble: {
    display: 'inline',
    borderRadius: 3,
    p: 1,
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
    boxShadow: '0 10px 6px -6px #777',
    marginLeft: 2,
    maxWidth: {
      lg: 500,
      md: 400,
      sm: 300,
      xs: 200,
    },
  },

  textMessage: {
    fontSize: {
      lg: 21,
      md: 19,
      sm: 17,
      xs: 15,
    },
    color: '#000',
  },

  timeStamp: {
    fontSize: {
      lg: 12,
      md: 10,
      sm: 9,
      xs: 8,
    },
    display: 'flex',
    justifyContent: 'end',
    color: '#000',
  },
};

export default textStyles;

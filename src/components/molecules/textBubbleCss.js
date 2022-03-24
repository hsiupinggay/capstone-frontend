const textStyles = {
  texterBubble: {
    display: 'inline',
    borderRadius: 3,
    p: 1,
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#d7ebce'),
    boxShadow: '0 10px 6px -6px #adadad',
    marginRight: 2,
    marginBottom: 1,
  },

  texteeBubble: {
    display: 'inline',
    borderRadius: 3,
    p: 1,
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
    boxShadow: '0 10px 6px -6px #adadad',
    marginLeft: 2,
    marginBottom: 1,
  },

  textMessage: {
    fontSize: 15,
  },

  timeStamp: {
    fontSize: {
      sm: 10,
      xs: 9,
    },
    display: 'flex',
    justifyContent: 'end',
    color: '#999999',
  },
};

export default textStyles;

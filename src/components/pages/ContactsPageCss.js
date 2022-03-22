const contactPageStyles = {

  modalStyle: {
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
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#22577A',
  },

  addIcon: {
    fontSize: {
      xl: 44,
      lg: 42,
      md: 40,
      sm: 34,
      xs: 28,
    },
    color: '#22577A',
    '&:hover': {
      color: '#3486bb',
    },
  },

  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -1,
  },

  avatar: {
    width: {
      xl: 67,
      lg: 65,
      md: 60,
      sm: 55,
      xs: 50,
    },
    height: {
      xl: 67,
      lg: 65,
      md: 60,
      sm: 55,
      xs: 50,
    },
  },

  smallAvatar: {
    width: {
      xl: 40,
      lg: 38,
      md: 35,
      sm: 32,
      xs: 29,
    },
    height: {
      xl: 40,
      lg: 38,
      md: 35,
      sm: 32,
      xs: 29,
    },
  },

  badge: {
    width: 'fit-content',
  },

  contactName: {
    marginBottom: 1,
    fontSize: {
      xl: 16,
      lg: 14,
      md: 12,
      sm: 10,
      xs: 9,
    },
    fontWeight: 400,
  },

  smallContactName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    fontSize: {
      xl: 13,
      lg: 12,
      md: 11,
      sm: 10,
      xs: 9,
    },
    fontWeight: 400,
    height: 20,
  },

  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    justifyContent: 'space-around',
    marginLeft: 5,
    marginRight: 5,
  },

  smallContactContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    width: 'fit-content',
  },

  requestsContainer: {
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: 10,
    width: {
      xl: 1200,
      lg: 1000,
      md: 800,
      sm: 550,
      xs: 400,
    },
    display: 'flex',
    flexDirection: 'column',
  },

  incomingContainer: {
    backgroundColor: '#eeeeee',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: 10,
    width: {
      xl: 1200,
      lg: 1000,
      md: 800,
      sm: 550,
      xs: 400,
    },
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },

  sentContainer: {
    backgroundColor: '#eeeeee',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: 10,
    width: {
      xl: 1200,
      lg: 1000,
      md: 800,
      sm: 550,
      xs: 400,
    },
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },

  acceptedContainer: {
    backgroundColor: '#eeeeee',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: 10,
    width: {
      xl: 1200,
      lg: 1000,
      md: 800,
      sm: 600,
      xs: 400,
    },
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },

  rejectedContainer: {
    backgroundColor: '#eeeeee',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: 10,
    width: {
      xl: 1200,
      lg: 1000,
      md: 800,
      sm: 550,
      xs: 400,
    },
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },

  allContactsContainer: {
    backgroundColor: '#eeeeee',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: 10,
    width: {
      xl: 1200,
      lg: 1000,
      md: 800,
      sm: 550,
      xs: 400,
    },
    padding: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflow: 'auto',
    marginTop: -3,
  },

  smallTitle: {
    fontSize: {
      xl: 15,
      lg: 14,
      md: 13,
      sm: 12,
      xs: 11,
    },
    fontWeight: 500,
    marginTop: -2,
  },

  icon: {
    fontSize: {
      xl: 20,
      lg: 18,
      md: 16,
      sm: 15,
      xs: 14,
    },
    color: '#38A3A5',
    '&:hover': {
      color: '#2facfe',
    },
  },

  secondRowContainer: {
    marginTop: 1.2,
    display: 'flex',
  },

  iconsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  acceptIcon: {
    fontSize: {
      xl: 20,
      lg: 18,
      md: 16,
      sm: 15,
      xs: 14,
    },
    color: 'green',
    '&:hover': {
      color: '#00FF00',
    },
  },

  rejectIcon: {
    fontSize: {
      xl: 20,
      lg: 18,
      md: 16,
      sm: 15,
      xs: 14,
    },
    color: '#bd0000',
    '&:hover': {
      color: '#ff0000',
    },
  },

  dismissAcceptIcon: {
    color: 'green',
    fontSize: {
      xl: 20,
      lg: 18,
      md: 16,
      sm: 15,
      xs: 14,
    },
    '&:hover': {
      color: '#00FF00',
      fontSize: {
        xl: 22,
        lg: 20,
        md: 18,
        sm: 17,
        xs: 16,
      },
    },
  },

  dismissRejIcon: {
    color: '#bd0000',
    fontSize: {
      xl: 20,
      lg: 18,
      md: 16,
      sm: 15,
      xs: 14,
    },
    '&:hover': {
      color: '#ff0000',
      fontSize: {
        xl: 22,
        lg: 20,
        md: 18,
        sm: 17,
        xs: 16,
      },
    },
  },

  iconContainer: {
    marginTop: 2,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
};

export default contactPageStyles;

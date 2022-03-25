const contactPageStyles = {

  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 350,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '20px',
    boxShadow: 24,
    p: 1,
    overflow: 'hidden',
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#22577A',
  },

  bigIcon: {
    fontSize: {
      sm: 30,
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

  dropdown: {
    width: '200px',
    bgcolor: 'background.paper',
    zIndex: 1,
  },

  icon: {
    fontSize: {
      sm: 22,
      xs: 18,
    },
    color: '#38A3A5',
    '&:hover': {
      color: '#2facfe',
    },
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

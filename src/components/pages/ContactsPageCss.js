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
    fontSize: 25,
    fontWeight: 600,
  },

  addIcon: {
    fontSize: 50,
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
    width: 70,
    height: 70,
  },

  smallAvatar: {
    width: 40,
    height: 40,
  },

  contactName: {
    marginBottom: 1,
    fontSize: 16,
    fontWeight: 400,
  },

  smallContactName: {
    marginBottom: 1,
    fontSize: 12,
    fontWeight: 400,
    height: 20,
  },

  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
  },

  smallContactContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 2,
  },

  requestsContainer: {
    backgroundColor: '#eeeeee',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: 10,
    width: 1500,
    display: 'flex',
    flexDirection: 'column',

  },

  outGoingContainer: {
    backgroundColor: '#fff',
    borderTop: 'black solid 0.5px',
    borderBottom: 'black solid 0.5px',
    width: 1500,
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },

  allContactsContainer: {
    backgroundColor: '#eeeeee',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: 10,
    width: 1500,
    padding: 3,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    overflow: 'auto',
  },

  smallTitle: {
    fontSize: 20,
    fontWeight: 500,
  },

  icon: {
    fontSize: 25,
    color: '#22577A',
    '&:hover': {
      color: '#2facfe',
    },
  },

  secondRowContainer: {
    display: 'flex',
  },

  iconsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  acceptIcon: {
    fontSize: 20,
    color: 'green',
    '&:hover': {
      color: '#00FF00',
    },
  },

  rejectIcon: {
    fontSize: 20,
    color: '#bd0000',
    '&:hover': {
      color: '#ff0000',
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

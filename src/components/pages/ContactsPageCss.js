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
    fontSize: 40,
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
    width: 160,
    height: 160,
  },

  smallAvatar: {
    width: 40,
    height: 40,
  },

  contactName: {
    marginBottom: 2,
    fontSize: 20,
    fontWeight: 400,
  },

  smallContactName: {
    marginBottom: 2,
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
    backgroundColor: '#f8f3e9',
    // backgroundColor: '#000',
    boxShadow: '0 1px 4px 0',
    borderRadius: 10,
    width: 1500,
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    overflow: 'auto',
  },

  outGoingContainer: {
    backgroundColor: '#fff',
    // backgroundColor: '#000',
    // boxShadow: '0 1px 4px 0',
    borderTop: 'black solid 0.5px',
    borderBottom: 'black solid 0.5px',
    width: 1500,
    display: 'flex',
    // justifyContent: 'center',
  },

  allContactsContainer: {
    backgroundColor: '#f8f3e9',
    // backgroundColor: '#000',
    boxShadow: '0 1px 4px 0',
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

  iconColor: {
    color: '#22577A',
    '&:hover': {
      color: '#2facfe',
    },
  },

  iconContainer: {
    marginTop: 2,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
  // cardContainer: {
  //   padding: 10,
  //   height: 250,
  //   display: 'flex',
  //   flexWrap: 'nowrap',
  //   overflow: 'auto',
  // },

  // card: {
  //   width: '150px',
  //   height: '200px',
  //   my: '10px',
  //   mr: '16px',
  //   borderRadius: '20px',
  // },

};

export default contactPageStyles;

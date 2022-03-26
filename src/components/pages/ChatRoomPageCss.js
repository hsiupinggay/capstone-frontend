const chatStyles = {
  container: {
    backgroundImage: `url(${'https://neighbourhood-app.s3.ap-southeast-1.amazonaws.com/whatsApp.webp'})`,
    height: '84vh',
    width: {
      xs: '310px', sm: '400px', md: '500px', lg: '600px',
    },
    position: 'relative',
  },

  messageContainer: {
    height: '63vh',
    overflow: 'scroll',
  },

  header: {
    backgroundColor: '#303030',
    display: 'flex',
    alignItems: 'center',
    left: 0,
    marginBottom: 2,
    padding: 1,
    position: 'sticky',
    top: 0,
  },

  avatar: {
    width: 40,
    height: 40,
    marginLeft: 2,
  },

  name: {
    color: '#f0f2f5',
    marginLeft: 2,
    fontSize: {
      lg: 25,
      md: 21,
      sm: 18,
      xs: 15,
    },
    fontWeight: 500,
  },
};

export default chatStyles;

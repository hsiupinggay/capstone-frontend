const chatStyles = {
  container: {
    backgroundImage: `url(${'https://neighbourhood-app.s3.ap-southeast-1.amazonaws.com/whatsApp.webp'})`,
    height: {
      lg: '84vh',
      md: '84vh',
      sm: '84vh',
      xs: '81vh',
    },
    overflow: 'scroll',
  },

  header: {
    backgroundColor: '#222121',
    display: 'flex',
    alignItems: 'center',
    left: 0,
    marginBottom: 2,
    width: {
      lg: 1000,
      md: 800,
      sm: 600,
      xs: 400,
    },
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

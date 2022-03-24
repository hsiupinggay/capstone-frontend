const patientListStyles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 500,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '20px',
    boxShadow: 24,
    p: 1,
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

  title: {
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,
    fontSize: 60,
    fontWeight: 700,
    color: '#22577A',
  },

  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -1,
  },

  description: {
    marginTop: 5,
    fontSize: 20,
  },

  buttonContainer: {
    width: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 4,
    fontSize: 20,
  },
};

export default patientListStyles;

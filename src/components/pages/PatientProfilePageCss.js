const patientProfilePageStyles = {
  backIcon: {
    fontSize: {
      xs: 46,
      sm: 48,
      md: 50,
      lg: 53,
      xl: 55,
    },
    marginTop: {
      xs: 0.6,
      sm: 1,
      md: 1.2,
      lg: 1.4,
      xl: 1.6,
    },
    marginRight: 2,
    color: '#22577A',
  },

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

  titleFont: {
    fontSize: {
      xs: 35,
      sm: 40,
      md: 43,
      lg: 46,
      xl: 50,
    },
    fontWeight: 800,
    color: '#22577A',
    marginBottom: 1,
    textShadow: '1px 1px black',
  },

  relationship: {
    fontSize: {
      xs: 15,
      sm: 18,
      md: 20,
      lg: 22,
      xl: 25,
    },
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIconContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  allCategoryContainer: {
    paddingTop: {
      xs: 9,
      sm: 7,
      md: 6,
      lg: 5.5,
      xl: 4.5,
    },
  },

  categoryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  categories: {
    padding: 12,
    border: 'solid black 1px',
    borderRadius: 10,
    backgroundColor: '#22577A',
    width: {
      xs: 180,
      sm: 200,
      md: 225,
      lg: 250,
      xl: 300,
    },
    height: {
      xs: 175,
      sm: 200,
      md: 225,
      lg: 250,
      xl: 270,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    boxShadow: '0 10px 6px -6px #777',
  },

  categoryNames: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: {
      xs: 18,
      sm: 20,
      md: 22,
      lg: 24,
      xl: 29,
    },
    fontWeight: 600,
    color: '#fff',
    width: 300,
    textShadow: '2px 1px black, 0 1px black, 1px 0 black, 0 -1px black',
  },

  categoryDescription: {
    fontSize: {
      xs: 10,
      sm: 11,
      md: 13,
      lg: 14,
      xl: 16,
    },
    fontWeight: 200,
    color: '#fff',
    width: 'inherit',
    display: 'flex',
    justifyContent: 'center',
  },

};

export default patientProfilePageStyles;

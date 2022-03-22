const AppointmentPageStyles = {
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
  
  mainContainer: {
    width: '80%',
    mx: 'auto',
  },

  apptReminder: {
    fontSize: {
      xs: 13,
      sm: 14,
      md: 15,
      lg: 16,
      xl: 18,
    },
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },


  allCategoryContainer: {
    paddingTop: {
      xs: 10,
      sm: 9,
      md: 8,
      lg: 7,
      xl: 6,
    },
  },

  categoryContainer: {
    width: 1300,
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
      xs: 26,
      sm: 27,
      md: 28,
      lg: 29,
      xl: 34,
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

export default AppointmentPageStyles;
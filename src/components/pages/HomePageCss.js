const homePageStyles = {
  titleFont: {
    fontSize: {
      xs: 35,
      sm: 40,
      md: 45,
      lg: 50,
    },
  },

  apptReminder: {
    fontSize: {
      xs: 20,
      md: 22,
      lg: 25,
    },
  },

  appointmentText: {
    fontSize: {
      xs: 16,
      md: 18,
      lg: 20,
    },
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
      xs: 4,
      sm: 4,
      md: 5,
      lg: 7,

    },
  },

  categoryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  primaryCategories: {
    borderRadius: 10,
    backgroundColor: '#718da8',
    width: {
      xs: 130,
      sm: 150,
      md: 180,

    },
    height: {
      xs: 130,
      sm: 150,
      md: 180,

    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    boxShadow: '0 10px 6px -6px #c4c4c4',
  },

  secondaryCategories: {
    borderRadius: 10,
    backgroundColor: '#718da8',
    width: {
      xs: 130,
      sm: 150,
      md: 180,

    },
    height: {
      xs: 130,
      sm: 150,
      md: 180,

    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    boxShadow: '0 10px 6px -6px #c4c4c4',
  },

  categoryNames: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: {
      xs: 18,
      sm: 27,
      md: 28,
    },
    color: '#fff',
    width: 300,
  },

  categoryDescription: {
    fontSize: {
      xs: 14,
      md: 14,
      xl: 16,
    },
    display: { sm: 'block', xs: 'none' },
    fontWeight: 400,
    color: '#fff',
    width: 'inherit',
    justifyContent: 'center',
  },

};

export default homePageStyles;

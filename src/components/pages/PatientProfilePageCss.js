const patientProfilePageStyles = {
  iconBtn: {
    marginTop: {
      xs: 0.6,
      sm: 1,
      md: 1.2,
      lg: 1.4,
      xl: 1.6,
    },
    marginRight: 2,
  },

  backIcon: {
    fontSize: {
      xs: 46,
      sm: 48,
      md: 50,
      lg: 53,
      xl: 55,
    },
    color: '#3254a8',
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
    marginTop: 7,
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
      sm: 9.5,
      md: 12,
      lg: 14,

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
      sm: 20,
      md: 24,
    },
    color: '#fff',
    width: 300,
  },

  categoryDescription: {
    fontSize: {
      xs: 10,
      sm: 11,
      md: 13,
      lg: 14,
      xl: 14,
    },
    fontWeight: 200,
    color: '#fff',
    width: 'inherit',
    display: 'flex',
    justifyContent: 'center',
  },

};

export default patientProfilePageStyles;

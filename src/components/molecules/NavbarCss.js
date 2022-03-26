const navStyles = {
  appBar: {
    display: {
      xs: 'none',
      sm: 'flex',
    },
  },

  toolBar: {
    mr: 2,
    display: {
      xs: 'none',
      sm: 'flex',
    },
  },

  appName: {
    fontVariant: 'h1',
    mr: 2,
    component: 'div',
    fontSize: {
      sm: 21,
      md: 25,
      lg: 25,
    },
  },

  navContainer: {
    display: 'flex',
    justifyContent: 'start',
    flexGrow: 1,
  },

  navBtn: {
    fontSize: {
      sm: 13,
      md: 14,
      lg: 15,
    },
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#525B2B',
    },
  },

  navProfileContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  navNameContainer: {
    marginRight: {
      lg: 2,
      sm: 1,
    },
  },

  navProfileName: {
    fontSize: {
      md: 13,
      lg: 15,
      xl: 18,
    },
    display: {
      sm: 'none',
      md: 'none',
      lg: 'block',
    },
  },

  navProfilePic: {
    marginRight: {
      sm: 1,
      md: 3,
      lg: 6,
      xl: 7,
    },
  },

  bottomNavContainer: {
    zIndex: 1,
    display: {
      sm: 'none',
      xs: 'block',
    },
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'fixed',
  },

  bottomNavBar: {
    display: {
      sm: 'none',
      xs: 'flex',
    },
    backgroundColor: '#3254a8',
    '& .Mui-selected': {
      '& .MuiBottomNavigationAction-label': {
        lineHeight: '20px',
      },
      '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
        color: '#ffffff',
      },
    },
  },

  bottomNavBtn: {
    color: '#000000',
    '&:hover': {
      backgroundColor: '#718da8',
      color: '#ffffff',
    },
  },
};

export default navStyles;

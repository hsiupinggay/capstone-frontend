const navStyles = {
  appBar: {
    backgroundColor: 'primary',
    display: {
      xxs: 'none',
      xs: 'none',
      sm: 'flex',
    },
  },

  toolBar: {
    display: {
      xs: 'none',
      sm: 'flex',
    },

  },

  appName: {
    fontVariant: 'h1',
    component: 'div',
    marginLeft: {
      lg: 8,
      md: 7,
      sm: 0,
    },
    marginRight: {
      lg: 6,
      md: 4,
      sm: 0,
    },

    fontSize: {
      sm: 16,
      md: 21,
      lg: 25,
    },
  },

  navContainer: {
    backgroundColor: '#22577A',
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },

  navBtn: {
    fontSize: {
      sm: 13,
      md: 15,
      lg: 18,
    },
    paddingLeft: {
      sm: 0,
      md: 2,
      lg: 2,
    },
    paddingRight: {
      sm: 0,
      md: 2,
      lg: 2,
    },
    backgroundColor: '#22577A',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#22577A',
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
    backgroundColor: '#22577A',
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
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#2f7bad',
      color: '#ffffff',
    },
  },
};

export default navStyles;

import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import GamesHeader from '../components/home/GamesHeader';
import DrawerComponent from '../components/home/DrawerComponent';
import GamesList from '../components/home/GamesList';

const drawerWidth = 240;

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#2A2A2A'
    },
    secondary: {
      main: '#000'
    }
  }
});

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          backgroundColor: 'black',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column' // Adicione esta linha para garantir flex vertical
        }}
      >
        <CustomAppBar position="absolute" open={openDrawer}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
            >
              {openDrawer ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <GamesHeader openDrawer={openDrawer} onMenuClick={toggleDrawer} />
          </Toolbar>
        </CustomAppBar>
        <DrawerComponent open={openDrawer} onClose={handleDrawerClose} />
        <GamesList />
      </Container>
    </ThemeProvider>
  );
};

export default Home;

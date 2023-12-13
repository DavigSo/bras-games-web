import React, { useEffect, useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

// Your CustomLink component definition
const CustomLink = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} />);

const DrawerComponent = ({ open, onClose, navigate }) => {
  const drawerWidth = 240;
  const [drawerStyle, setDrawerStyle] = useState({ width: drawerWidth });

  useEffect(() => {
    setDrawerStyle({
      width: open ? `${drawerWidth}px` : '0',
      transition: 'width 0.2s'
    });

    const handleResize = () => {
      setDrawerStyle({
        width: open ? `${drawerWidth}px` : '0',
        transition: 'width 0.2s'
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  return (
    <MuiDrawer
      variant="permanent"
      open={open}
      onClose={onClose}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          ...drawerStyle,
          backgroundColor: '#2A2A2A' // Adiciona a cor de fundo desejada
        }
      }}
    >
      <Toolbar />
      <Divider />
      <List component="nav">
        {/* Link de "Home" no menu lateral */}
        <ListItemButton
          component={CustomLink}
          to="/home"
          className="home-link"
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              height: '2px',
              background:
                'linear-gradient(to right, transparent, rgba(255, 0, 0, 0.5), transparent)'
            }
          }}
        >
          <ListItemIcon>
            <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
              <HomeIcon />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        {/* Link de "CreateGame" no menu lateral */}
        <ListItemButton
          component={CustomLink}
          to="/createGame"
          className="create-game-link"
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              height: '2px',
              background:
                'linear-gradient(to right, transparent, rgba(255, 0, 0, 0.5), transparent)'
            }
          }}
        >
          <ListItemIcon>
            <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
              <AddCircleOutlineIcon />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="CreateGame" />
        </ListItemButton>
      </List>
    </MuiDrawer>
  );
};

export default DrawerComponent;

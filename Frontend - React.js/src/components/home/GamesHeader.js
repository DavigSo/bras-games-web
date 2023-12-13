import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import httpService from '../../services/httpService';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Import your logo image
import logoImage from '../../assets/BGLOGO.png';
import { Link } from 'react-router-dom';

const GamesHeader = ({ openDrawer, onMenuClick }) => {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });
  const [pendingChanges, setPendingChanges] = useState({});

  const userId = localStorage.getItem('_id');

  const handleUserDialogOpen = async () => {
    try {
      console.log('userId (handleUserDialogOpen):', userId);
      const response = await httpService.getUserById(userId);
      const userDataFromServer = await response.json();

      setUserData(userDataFromServer);
      setPendingChanges({});
      setIsUserDialogOpen(true);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const handleUserDialogClose = () => {
    setIsUserDialogOpen(false);
    setIsEditing(false);
    setPendingChanges({});
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUserDataChange = e => {
    const { name, value } = e.target;
    setPendingChanges(prevChanges => ({
      ...prevChanges,
      [name]: value
    }));
  };

  const handleSaveUserData = async () => {
    try {
      console.log('Antes de chamar updateUser. userId:', userId, 'pendingChanges:', pendingChanges);
      await httpService.updateUser(userId, pendingChanges);
      console.log('Informações do usuário atualizadas com sucesso!');
      setIsEditing(false);
      setPendingChanges({});
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  useEffect(() => {
    console.log('userId:', userId);

    const fetchUserData = async () => {
      try {
        const response = await httpService.getUserById(userId);
        const userDataFromServer = await response.json();
        setUserData(userDataFromServer);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <>
      <AppBar position="absolute" open={openDrawer}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={onMenuClick}>
              <MenuIcon />
            </IconButton>
          </div>
          {/* Logo image in the middle */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImage} alt="Logo" style={{ height: 100, width: 100 }} />
          </div>
          <div>
            <IconButton color="inherit" onClick={handleUserDialogOpen}>
              <AccountCircleIcon />
            </IconButton>
            {/* Wrap IconButton for the cart in Link */}
            <Link to="/carrinho" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <Dialog open={isUserDialogOpen} onClose={handleUserDialogClose}>
        <DialogTitle>Dados do Usuário</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={pendingChanges.username || userData.username}
            onChange={handleUserDataChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Email"
            name="email"
            value={pendingChanges.email || userData.email}
            onChange={handleUserDataChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserDialogClose} color="primary">
            Cancelar
          </Button>
          {!isEditing && (
            <Button onClick={handleEditClick} color="primary">
              Editar
            </Button>
          )}
          {isEditing && (
            <Button onClick={handleSaveUserData} color="primary">
              Salvar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GamesHeader;

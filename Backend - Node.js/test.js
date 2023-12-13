import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import teal from '@mui/material/colors/teal';
import pink from '@mui/material/colors/pink';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/home.css'; // Importe o CSS

// Define um componente Link personalizado que usa o RouterLink do React Router
const CustomLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const drawerWidth = 240;

// Estiliza a barra de aplicativo (AppBar)
const AppBar = styled(MuiAppBar, {
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

// Estiliza o menu lateral (Drawer)
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

// Define um tema personalizado usando a paleta de cores teal e pink
const customTheme = createTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    secondary: {
      main: pink[500]
    }
  }
});

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState(false); // Estado para controlar a abertura/fechamento do menu lateral
  const [games, setGames] = useState([]); // Estado para armazenar a lista de produtos
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos produtos
  const [editingGamesIndex, setEditingGamesIndex] = useState(null);
  const navigate = useNavigate();
  if (!localStorage.getItem('token') || !localStorage.getItem('usuario')) {
    window.location.reload();
    navigate('/login');
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };
  // Função para ativar o modo de edição de preço de um produto
  const handleUpdatePrice = GamesIndex => {
    setEditingGamesIndex(GamesIndex);
  };

  // Função para enviar o formulário de promoção
  const handleUpdate = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
      console.log(key, value);
    }

    try {
      const resposta = await httpService.createPromotion(data);
      const resultado = await resposta.json();
      if (resultado.message) {
        return toast(resultado.message);
      }
      window.location.reload(); // Recarrega a página após a atualização
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchGames() {
      try {
        // Simula a busca de produtos a partir de um serviço HTTP
        const response = await httpService.getGames();
        setGames(response);
        setLoading(false); // Define que o carregamento foi concluído
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false); // Define que o carregamento foi concluído (mesmo em caso de erro)
      }
    }
    fetchGames();
  }, []);

  const toggleDrawer = () => {
    // Função para abrir/fechar o menu lateral
    setOpenDrawer(!openDrawer);
  };

  // Função para lidar com a exclusão de um produto
  const handleClick = async e => {
    try {
      const resultado = await httpService.removeGames({ id: e });
      if (!resultado) {
        window.location.reload();
      } else if (resultado.message) {
        return toast(resultado.message);
      }
      toast(resultado.confirme); // Exibe uma mensagem de confirmação
      window.location.reload(); // Recarrega a página após a exclusão
    } catch (erro) {
      window.location.reload(); // Recarrega a página após a exclusão
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <CssBaseline />
        {/* Barra de aplicativo (AppBar) */}
        <AppBar position="absolute" open={openDrawer}>
          <Toolbar
            sx={{
              pr: '24px'
            }}
          >
            {/* Ícone para abrir/fechar o menu lateral */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px'
              }}
            >
              {openDrawer ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            {/* Título da aplicação */}
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              SuperMarket
            </Typography>
            {/* Ícone de usuário */}
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* Menu lateral (Drawer) */}
        <Drawer variant="permanent" open={openDrawer}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          ></Toolbar>
          <Divider />

          <List component="nav">
            {/* Link de "Home" no menu lateral */}
            <ListItemButton component={CustomLink} to="/home" className="home-link">
              <ListItemIcon>
                <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
                  <HomeIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </List>
          <List component="nav">
            {/* Link de "CreateGame" no menu lateral */}
            <ListItemButton component={CustomLink} to="/createGame" className="create-game-link">
              <ListItemIcon>
                <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
                  <AddCircleOutlineIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="CreateGame" />
            </ListItemButton>
          </List>
          <List component="nav">
            {/* Link de "Promotion" no menu lateral */}
            <ListItemButton component={CustomLink} to="/promotion" className="promotion-link">
              <ListItemIcon>
                <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
                  <MonetizationOnIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Promotion" />
            </ListItemButton>
          </List>
          <List component="nav">
            {/* Link de "Log out" no menu lateral */}
            <ListItemButton onClick={logout} className="login-link">
              <ListItemIcon>
                <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
                  <LogoutIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>

        {/* Conteúdo principal */}
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" component="form" sx={{ mt: 10, mb: 10 }}>
            {/* Verifica se está carregando os produtos ou se a lista de produtos está vazia */}
            {loading ? (
              <p>Carregando produtos...</p>
            ) : (
              // Lista de produtos
              <Grid container spacing={2}>
                {games.map((game, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    {/* Card de produto */}
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Imagem do produto */}
                      <CardMedia
                        component="img"
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover'
                        }}
                        image={game.urlImg}
                        alt={game.item}
                      />
                      {/* Conteúdo do card */}
                      <CardContent style={{ flexGrow: 1 }}>
                        {/* Nome do produto */}
                        <Typography gutterBottom variant="h5" component="div">
                          {game.item} {/* Corrigido de games para game */}
                        </Typography>
                        {/* Preço do produto */}
                        <Typography variant="h6" color="primary">
                          Preço: R$ {game.value} {/* Corrigido de games para game */}
                        </Typography>
                        {/* Botões e ações */}
                        {/* ... */}
                      </CardContent>
                      <Box component="form" sx={{ mt: 2 }} onSubmit={e => handleUpdate(e, index)}>
                        {/* Seu formulário */}
                        {/* ... */}
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;

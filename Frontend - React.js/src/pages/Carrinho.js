import React, { useState, useEffect } from 'react';
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
import httpService from '../services/httpService';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
      main: '#f3f3f3'
    },
    background: {
      default: '#000'
    }
  }
});

const Carrinho = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [gameDetails, setGameDetails] = useState([]);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const userId = localStorage.getItem('_id');
        const responseUser = await httpService.getUserById(userId);

        if (!responseUser.ok) {
          throw new Error('Erro ao obter detalhes do usuário');
        }

        const userData = await responseUser.json();

        console.log('Dados do usuário:', userData);

        if (userData.cart) {
          const responseCart = await httpService.getCartDetails(userData.cart);

          if (!responseCart.ok) {
            throw new Error('Erro ao obter detalhes do carrinho');
          }

          const cartDetailsData = await responseCart.json();
          console.log('Detalhes do carrinho:', cartDetailsData);
          setCartDetails(cartDetailsData);

          // Obter detalhes de cada jogo no carrinho
          const gamesWithDetails = await Promise.all(
            cartDetailsData.games.map(async game => {
              const responseGame = await httpService.getGameById(game.gameId);
              const gameDetail = await responseGame.json();
              return { ...game, ...gameDetail };
            })
          );

          setGameDetails(gamesWithDetails);
        } else {
          throw new Error('Usuário não possui carrinho associado.');
        }
      } catch (error) {
        console.error('Erro:', error);
        navigate('/login');
      }
    };

    fetchCartDetails();
  }, [navigate]);

  const calculateTotal = () => {
    if (gameDetails && gameDetails.length > 0) {
      return gameDetails.reduce((total, game) => {
        const gameTotal = game.value * game.quantity;
        return total + gameTotal;
      }, 0);
    }
    return 0;
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
          flexDirection: 'column',
          paddingTop: '64px' // Adiciona espaço para o AppBar
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
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '16px'
          }}
        >
          <h1 style={{ color: 'white' }}>Conteúdo da Página do Carrinho</h1>
          {gameDetails && gameDetails.length > 0 ? (
            <div>
              <h2 style={{ color: 'white' }}>Detalhes do Carrinho</h2>
              {gameDetails.map((game, index) => (
                <Card
                  key={index}
                  sx={{
                    maxWidth: 345,
                    backgroundColor: '#991F36',
                    color: 'white',
                    marginBottom: '16px'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={game.urlImg} // Substitua pela URL real da imagem do jogo
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {game.item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantidade: {game.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Valor: R$ {game.value.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              <Typography variant="h6" style={{ color: 'white', marginTop: '16px' }}>
                Valor Total do Carrinho: R$ {calculateTotal().toFixed(2)}
              </Typography>
            </div>
          ) : (
            <p style={{ color: 'white' }}>Nenhum item no carrinho.</p>
          )}
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Carrinho;

import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import httpService from '../../services/httpService';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from './SearchBar';

const getUserIdFromLocalStorage = () => {
  // Implemente a lógica para obter o ID do usuário do armazenamento local
  // Por exemplo, se você estiver usando o localStorage:
  const userId = localStorage.getItem('_id');
  return userId;
};

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await httpService.getGames();
        setGames(response);

        // Substitua pela lógica real de obtenção do ID do usuário
        const loggedInUserId = getUserIdFromLocalStorage();
        setUserId(loggedInUserId);

        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  const darkTheme = createTheme({
    palette: {
      background: {
        default: '#000000'
      }
    }
  });

  const handleAddToCart = async game => {
    try {
      if (!userId) {
        console.error('ID do usuário não definido.');
        return;
      }

      if (!game.id) {
        console.error('ID do jogo não definido:', game);
        return;
      }

      console.log('Fazendo solicitação para adicionar ao carrinho:', { userId, gameId: game.id });

      const response = await httpService.addToCart(userId, game.id);

      console.log(`Added ${game.item} to the cart. Response:`, response);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const handleSearch = searchTerm => {
    console.log('Pesquisa acionada com termo:', searchTerm);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        component="form"
        sx={{
          mt: 15,
          mb: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <p style={{ textAlign: 'center' }}>Carregando produtos...</p>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {games.map((game, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#d3d3d3',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    transform: 'rotateY(0deg) perspective(1000px)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotateY(15deg) perspective(1000px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    style={{
                      width: '159.36px',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                    image={game.urlImg}
                    alt={game.item}
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {game.item}
                    </Typography>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" color="primary">
                        R$ {game.value},90
                      </Typography>
                      <IconButton
                        color="primary"
                        aria-label="Adicionar ao Carrinho"
                        onClick={() => handleAddToCart(game)}
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                    </Grid>
                  </CardContent>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '100%',
                      height: '2px',
                      background:
                        'linear-gradient(to right, transparent, rgba(255, 0, 0, 0.5), transparent)'
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default GamesList;

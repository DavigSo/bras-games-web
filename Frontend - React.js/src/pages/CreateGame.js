import React, { useState /* useEffect */ } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import httpService from '../services/httpService';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importações adicionadas
import GamesHeader from '../components/home/GamesHeader';
import DrawerComponent from '../components/home/DrawerComponent';

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
      main: '#d3d3d3'
    },
    secondary: {
      main: '#000'
    }
  }
});

const CreateGame = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCreateGame = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    for (const [key, value] of formData) {
      data[key] = value;
    }

    console.log('Data:', data); // Adiciona esta linha para verificar se os dados estão corretos

    try {
      const valor = await httpService.createGame(data);
      console.log('Response:', valor); // Adiciona esta linha para verificar a resposta do serviço

      const valoresult = await valor.json();

      console.log('Result:', valoresult); // Adiciona esta linha para verificar o resultado

      if (valoresult.message) {
        toast(valoresult.message);
      }
      toast(valoresult.Confirme);
      return navigate('/home');
    } catch (error) {
      console.error('Erro ao criar o jogo:', error);
      toast('Erro ao criar o jogo.');
    }
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
        <Box
          component="main"
          sx={{
            backgroundColor: '#000', // Plano de fundo preto
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container
            onSubmit={handleCreateGame}
            component="form"
            maxWidth="lg"
            sx={{
              mt: 10,
              mb: 10,
              backgroundColor: '#000' // Container transparente
            }}
          >
            <Card
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background branco com opacidade
                borderRadius: '10px', // Borda do card
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Sombra do card
                padding: '20px'
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Criar Novo Jogo
                </Typography>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Código"
                  name="cod"
                  fullWidth
                  margin="normal"
                  sx={{
                    borderRadius: '5px',
                    marginBottom: '10px',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o mouse está sobre o input
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o mouse está sobre o input
                      }
                    },
                    '&:focus': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o input está em foco
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o input está em foco
                      }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#991F36' // Cor da borda padrão
                    },
                    '& .MuiInputLabel-root': {
                      color: '#991F36' // Cor do texto da label padrão
                    }
                  }}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Name"
                  name="item"
                  fullWidth
                  margin="normal"
                  sx={{
                    borderRadius: '5px',
                    marginBottom: '10px',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o mouse está sobre o input
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o mouse está sobre o input
                      }
                    },
                    '&:focus': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o input está em foco
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o input está em foco
                      }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#991F36' // Cor da borda padrão
                    },
                    '& .MuiInputLabel-root': {
                      color: '#991F36' // Cor do texto da label padrão
                    }
                  }} // Borda do input
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Quantity"
                  name="amount"
                  fullWidth
                  margin="normal"
                  sx={{
                    borderRadius: '5px',
                    marginBottom: '10px',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o mouse está sobre o input
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o mouse está sobre o input
                      }
                    },
                    '&:focus': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o input está em foco
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o input está em foco
                      }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#991F36' // Cor da borda padrão
                    },
                    '& .MuiInputLabel-root': {
                      color: '#991F36' // Cor do texto da label padrão
                    }
                  }} // Borda do input
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Value"
                  name="value"
                  fullWidth
                  margin="normal"
                  sx={{
                    borderRadius: '5px',
                    marginBottom: '10px',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o mouse está sobre o input
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o mouse está sobre o input
                      }
                    },
                    '&:focus': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o input está em foco
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o input está em foco
                      }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#991F36' // Cor da borda padrão
                    },
                    '& .MuiInputLabel-root': {
                      color: '#991F36' // Cor do texto da label padrão
                    }
                  }} // Borda do input
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Link image"
                  name="urlImg"
                  fullWidth
                  margin="normal"
                  sx={{
                    borderRadius: '5px',
                    marginBottom: '10px',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o mouse está sobre o input
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o mouse está sobre o input
                      }
                    },
                    '&:focus': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black' // Cor da borda quando o input está em foco
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black' // Cor do texto da label quando o input está em foco
                      }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#991F36' // Cor da borda padrão
                    },
                    '& .MuiInputLabel-root': {
                      color: '#991F36' // Cor do texto da label padrão
                    }
                  }} // Borda do input
                />
              </CardContent>
              <CardActions>
                <Button variant="contained" type="submit" onSubmit={handleCreateGame}>
                  Criar Jogo
                </Button>
              </CardActions>
            </Card>
          </Container>
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default CreateGame;

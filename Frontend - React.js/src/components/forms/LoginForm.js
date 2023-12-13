import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/system';

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

const useStyles = () => {
  const theme = useTheme();
  return {
    logoContainer: {
      display: 'flex',
      alignItems: 'center', // Centraliza verticalmente os itens
      marginBottom: theme.spacing(4)
    },
    logoImage: {
      width: '100px', // Ajuste o tamanho da largura conforme necessário
      height: '100px', // Ajuste o tamanho da altura conforme necessário
      marginRight: theme.spacing(2) // Espaçamento à direita para separar a logo do título
    },
    divider: {
      width: '2px', // Largura da barra divisória
      height: '80px', // Altura da barra divisória
      backgroundColor: '#991F36', // Cor da barra divisória
      margin: theme.spacing(0, 2) // Espaçamento à esquerda e à direita da barra divisória
    },
    loginTitle: {
      color: '#d3d3d3', // Cor do título
      fontSize: '1.3rem', // Ajuste conforme necessário
      fontWeight: 'bold'
    },
    textField: {
      marginBottom: theme.spacing(2),
      backgroundColor: 'transparent',
      '& input': {
        color: '#991F36'
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#991F36'
      },
      '& label': {
        color: '#991F36'
      },
      '&:focus': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#991F36'
        }
      }
    },
    button: {
      marginTop: theme.spacing(2),
      backgroundColor: '#991F36',
      color: '#DDE3F0',
      '&:hover': {
        backgroundColor: '#d3d3d3'
      }
    },
    link: {
      textDecoration: 'none',
      color: '#991F36',
      '&:hover': {
        textDecoration: 'underline',
        color: '#5588FF'
      },
      '&:active': {
        color: '#5588FF'
      }
    }
  };
};

const LoginForm = ({ onSubmit, isClicked }) => {
  const classes = useStyles();

  return (
    <FormContainer component="form" onSubmit={onSubmit} width="100%">
      <div style={classes.logoContainer}>
        <img src={require('../../assets/BGLOGO.png')} alt="Logo" style={classes.logoImage} />
        <div style={classes.divider} />
        <div style={classes.loginTitle}>Make your log in</div>
      </div>

      <TextField
        required
        fullWidth
        margin="normal"
        name="email"
        label="Insira o seu Email"
        sx={classes.textField}
      />
      <TextField
        required
        fullWidth
        margin="normal"
        name="password"
        type="password"
        label="Password"
        sx={classes.textField}
      />
      <Button disabled={isClicked} type="submit" fullWidth variant="contained" sx={classes.button}>
        Send
      </Button>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item>
          <Link to="/signup" className={classes.link}>
            Don't have an account? Create Account
          </Link>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default LoginForm;

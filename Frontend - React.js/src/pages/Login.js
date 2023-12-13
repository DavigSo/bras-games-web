import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import httpService from '../services/httpService';
import { toast, ToastContainer } from 'react-toastify';
import { Box, CssBaseline, Paper } from '@mui/material';
import backgroundImage from '../assets/1.png';

const Login = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  // Função para validar o token
  const isValidToken = token => {
    // Aqui você pode adicionar sua lógica de validação do token
    // Por exemplo, verificar a expiração, assinatura, etc.
    return !!token;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async e => {
    // Evita que o botão de login seja clicado várias vezes antes de obter uma resposta
    if (!isClicked) setIsClicked(true);
    e.preventDefault();

    try {
      // Coleta os dados do formulário
      const formData = new FormData(e.currentTarget);
      const data = {};
      for (const [key, value] of formData) {
        data[key] = value;
      }

      // Log dos dados enviados para o servidor (opcional)
      console.log('Dados enviados para o servidor:', data);

      // Envia a solicitação para fazer login usando os dados do formulário
      const response = await httpService.login(data);
      const result = await response.json();

      // Log da resposta do servidor (opcional)

      // Define um tempo limite para reativar o botão de login
      setTimeout(() => {
        if (result.message) {
          setIsClicked(false);
        }
      }, 500);

      // Exibe a mensagem do servidor, se houver
      if (!result) {
        toast('result.message');
        return;
      }
      console.log('Resposta do servidor:', result);

      // Verifica se o token está presente na resposta do servidor
      const accessToken = result['token'];
      const userId = result['_id'];
      if (!accessToken) {
        toast('Token de acesso não encontrado na resposta do servidor.');
        return;
      }

      // Armazena o id
      localStorage.setItem('_id', userId);

      // Verifica se o token é válido
      if (!isValidToken(accessToken)) {
        toast('Token de acesso inválido.');
        return;
      }

      // Redireciona para a página de home após o login bem-sucedido
      navigate('/home');
      console.log('Após o login', userId);
    } catch (err) {
      // Lida com erros desconhecidos
      toast('Erro desconhecido');
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`, // Substitua pelo caminho da sua imagem
        backgroundSize: 'cover', // Garante que a imagem cubra todo o elemento
        backgroundPosition: 'center', // Centraliza a imagem
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo preta com opacidade
        backdropFilter: 'blur(5px)' // Efeito de desfoque
      }}
    >
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 8,
          padding: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)' // Cor de fundo com opacidade
        }}
      >
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 8,
            padding: '15px'
          }}
        >
          <div
            style={{
              padding: '25px',
              borderRadius: 8
            }}
          >
            {/* Componente de formulário de login */}
            <LoginForm onSubmit={handleSubmit} isClicked={isClicked} />
          </div>
        </div>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default Login;

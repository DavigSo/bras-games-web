// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/forms/SignupForm';
import { Box, CssBaseline, Paper } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpService from '../services/httpService';
import backgroundImage from '../assets/1.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isClicked) setIsClicked(true);

    const formData = new FormData(e.currentTarget);
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }

    try {
      // Log dos dados enviados para o servidor (opcional)
      console.log('Dados enviados para o servidor:', data);

      // Envia a solicitação para criar um novo usuário usando os dados do formulário
      const response = await httpService.register(data);

      // Verifica o status da resposta
      if (response.ok) {
        // Converte a resposta para JSON
        const result = await response.json();

        // Log da resposta do servidor (opcional)
        console.log('Resposta do servidor:', result);

        // Exibe a mensagem do servidor, se houver
        if (result.message) {
          toast(result.message);
        }

        // Armazena o nome do usuário e o token de acesso no armazenamento local
        localStorage.setItem('usuario', result['EmployeeData']);
        localStorage.setItem('cart', result['EmployeeData']);
        localStorage.setItem('token', `Bearer ${result['Access-Token']}`);

        // Redireciona para a página de home após o registro bem-sucedido
        navigate('/home');
      } else {
        // Se a resposta não for bem-sucedida, trata o erro
        console.error('Erro na resposta do servidor:', response.statusText);
        toast('Erro ao criar o usuário. Por favor, tente novamente.');
      }
    } catch (err) {
      // Lida com erros desconhecidos
      console.error('Erro desconhecido:', err);
      toast('Erro desconhecido');
    } finally {
      // Define um tempo limite para reativar o botão de registro
      setTimeout(() => {
        setIsClicked(false);
      }, 500);
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
          <SignUpForm onSubmit={handleSubmit} isClicked={isClicked} />
        </div>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default SignUp;

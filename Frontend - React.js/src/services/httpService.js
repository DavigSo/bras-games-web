const httpService = {
  login: data => {
    return fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },
  register: data => {
    return fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },
  createGame: data => {
    return fetch('http://localhost:8000/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },
  getGames: async () => {
    try {
      const response = await fetch('http://localhost:8000/api/games');
      const games = await response.json();

      // Adiciona o ID a cada jogo antes de retornar
      const gamesWithId = games.map(game => {
        return {
          ...game,
          id: game._id // Use o campo _id como ID (ou ajuste conforme necessário)
        };
      });

      return gamesWithId;
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      throw error;
    }
  },
  removeGames: gameId => {
    return fetch(`http://localhost:8000/api/games/${gameId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  updateUser: (userId, userData) => {
    return fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
  },
  getUserById: userId => {
    return fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  addToCart: (userId, gameId) => {
    return fetch(`http://localhost:8000/api/cart/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, gameId })
    });
  },

  updateCartItem: (cartId, gameId) => {
    return fetch(`http://localhost:8000/api/cart/updateCartItem/${cartId}/${gameId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },

  removeCartItem: (cartId, gameId) => {
    return fetch(`http://localhost:8000/api/cart/removeCartItem/${cartId}/${gameId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },

  getCartDetails: cartId => {
    return fetch(`http://localhost:8000/api/cart/getCartDetails/${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  getGameById: gameId => {
    return fetch(`http://localhost:8000/api/games/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export default httpService;

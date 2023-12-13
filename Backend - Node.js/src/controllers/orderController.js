const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Order = require('../models/Order');
const Game = require('../models/Game');

// Controlador de pedidos
const orderController = {
  // Função para finalizar um pedido com base no ID do usuário
  finalizeCurrentOrder: async (userId) => {
    try {
      // Encontrar o usuário pelo ID
      const user = await User.findById(userId);
      console.log('usuario encontrado');
      if (!user) {
        console.log('Erro ao finalizar pedido: Usuário não encontrado.');
        return;
      }

      // Encontrar o carrinho do usuário
      const cart = await Cart.findById(user.cart);
      console.log('carrinho encontrado');
      if (!cart || !cart.games || cart.games.length === 0) {
        console.log(
          'Erro ao finalizar pedido: Carrinho vazio ou não encontrado.',
        );
        return;
      }

      // Calcular o valor total do pedido
      const totalValue = await orderController.calculateTotalValue(cart.games);

      // Criar um novo pedido
      const newOrder = await Order.create({
        user: userId,
        games: cart.games.map((game) => ({
          game: game.game,
          quantity: game.quantity,
          value: game.value || 0, // Certifique-se de fornecer um valor padrão se não estiver presente
        })),
        totalValue, // Certifique-se de fornecer um valor para o campo totalValue
        isCompleted: true,
      });

      // Limpar o carrinho após o pedido ser finalizado
      await orderController.clearCart(user.cart);

      console.log('Pedido finalizado com sucesso:', newOrder);
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error.message);
      throw error;
    }
  },

  // Função para calcular o valor total do pedido com base nos jogos no carrinho
  calculateTotalValue: async (games) => {
    try {
      console.log('Iniciando cálculo do valor total do pedido...');

      let totalValue = 0;

      for (const game of games) {
        // Agora você pode usar o model Game corretamente
        const gameInfo = await Game.findById(game.game); // Alteração nesta linha
        if (gameInfo) {
          totalValue += gameInfo.value * game.quantity;
        }
      }

      console.log('Cálculo do valor total concluído:', totalValue);

      return totalValue;
    } catch (error) {
      console.error('Erro ao calcular o valor total:', error.message);
      throw error;
    }
  },
  // Função para limpar o carrinho com base no ID do carrinho
  clearCart: async (cartId) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('Carrinho não encontrado.');
      }

      // Remover todos os jogos do carrinho
      cart.games = [];
      await cart.save();

      console.log('Carrinho zerado com sucesso.');
    } catch (error) {
      console.error('Erro ao zerar o carrinho:', error.message);
      throw error;
    }
  },

  // Função para obter detalhes de um pedido com base no ID do pedido
  getOrderDetails: async (orderId) => {
    try {
      // Encontrar o pedido pelo ID
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Pedido não encontrado.');
      }

      // Preparar detalhes do pedido para retorno
      const orderDetails = {
        user: order.user,
        games: order.games.map((item) => ({
          gameId: item.game,
          quantity: item.quantity,
        })),
        totalValue: order.totalValue,
        isCompleted: order.isCompleted,
      };

      return orderDetails;
    } catch (error) {
      console.error('Erro ao obter detalhes do pedido:', error.message);
      throw error;
    }
  },
  listUserOrders: async (userId) => {
    try {
      // Encontrar todos os pedidos do usuário
      const userOrders = await Order.find({ user: userId });

      // Mapear os detalhes de cada pedido
      const ordersDetails = userOrders.map((order) => ({
        orderId: order._id,
        games: order.games.map((item) => ({
          gameId: item.game,
          quantity: item.quantity,
          value: item.value,
        })),
        totalValue: order.totalValue,
        isCompleted: order.isCompleted,
      }));

      return ordersDetails;
    } catch (error) {
      console.error('Erro ao listar os pedidos do usuário:', error.message);
      throw error;
    }
  },
};

// Exportar o controlador de pedidos
module.exports = orderController;

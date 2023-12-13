import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateGame from './pages/CreateGame';
import Carrinho from './pages/Carrinho';

function App() {
  const defaultRouter = createBrowserRouter([
    {
      path: '/', // Mantenha a rota raiz como '/'
      element: <Navigate to="/login" /> // Redireciona para /login
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/home',
      element: <Home />
    },

    {
      path: '/signup',
      element: <Signup />
    },
    { path: '/createGame', element: <CreateGame /> },
    { path: '/carrinho', element: <Carrinho /> }
  ]);

  return (
    <div className="App">
      <RouterProvider router={defaultRouter} />
    </div>
  );
}

export default App;

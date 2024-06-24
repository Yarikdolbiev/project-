import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Menu from './pages/Menu';
import Header from './pages/Header';
import Cart from './pages/Cart';
import MenuItemDetails from './pages/MenuItemDetails';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <Router>
      {user && <Header user={user} />}
      <Routes>
        <Route path="/" element={user ? <Menu /> : <LoginPage onLogin={handleLogin} />} />
        
        {user && (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/menu/:id" element={<MenuItemDetails />} />
          </>
        )}

        {!user && (
          <Route path="/cart" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;123
import "../styles/HeaderMenu.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Header = ({ user }) => {
  return (
    <header className="header">
      <h1>PIZZA DAY</h1>
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="nav-link">Pizza</Link>
          <Link to="/cart" className="nav-linkdelete"><AddShoppingCartIcon /></Link>
        </div>
        <div className="nav-right">
          {user && <p className="user-info">{user}</p>}
        </div>
      </nav>
      <input
        type="search"
        className="search-input_Menu"
        placeholder="Search..."
      />
    </header>
  );
};

export default Header;
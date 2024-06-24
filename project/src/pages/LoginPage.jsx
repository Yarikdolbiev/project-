import { useState } from "react";
import "../styles/Login.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username);
    console.log("Logged in as:", username);
  };

  return (
    <div>
      <header>
        <h1>PIZZA DAY</h1>
        <input
          type="search"
          className="search-input_Menu"
          placeholder="Search..."
        />
      </header>
      <main>
        <h2>The Best Pizza</h2>
        <h1 className="text">Straight out of the oven, straight to you</h1>
        <h4>Welcome! Please start by telling us your name:</h4>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>
      </main>
    </div>
  );
};

export default LoginPage;

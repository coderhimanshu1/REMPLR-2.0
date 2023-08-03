import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Nav from "./routes/common/nav";
import Login from "./routes/auth/login";
import { useState } from "react";
import RemplrApi from "./helper/api";
import "./styles/App.css";
function App() {
  const [token, setToken] = useState(null);

  const handleLogin = async (loginData) => {
    try {
      let token = await RemplrApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login login={handleLogin} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

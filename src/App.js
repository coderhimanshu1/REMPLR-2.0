import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

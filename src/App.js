import "./App.css";
import Navber from "./navber";
import Home from "./home";
import Tickets from "./tickets";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navber />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Tickets" element={<Tickets />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

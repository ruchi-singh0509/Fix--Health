import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Appointment from "./pages/Appointment";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

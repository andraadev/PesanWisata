import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages';
import DestinasiWisata from './pages/destinasi_wisata';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/destinasi" element={<DestinasiWisata/>} />
      </Routes>
    </Router>
  );
}

export default App;

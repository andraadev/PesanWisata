import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages';
import DestinasiWisata from './pages/destinasi_wisata';
import DataBooking from './pages/data_booking';
import Booking from './pages/booking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/destinasi" element={<DestinasiWisata/>} />
        <Route path="/booking/:slug" element={<Booking/>} />
        <Route path="/data-booking" element={<DataBooking/>} />
      </Routes>
    </Router>
  );
}

export default App;
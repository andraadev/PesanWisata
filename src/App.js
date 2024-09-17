import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages';
import DestinasiWisata from './pages/destinasi_wisata';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import BerandaAdmin from './pages/admin';
import DataUser from './pages/admin/users';
import TambahDataUser from './pages/admin/users/add';
import EditDataUser from './pages/admin/users/update';
import DataDestinasi from './pages/admin/destinations';
import TambahDestinasi from './pages/admin/destinations/add';
import EditDataDestinasi from './pages/admin/destinations/update';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/destinasi" element={<DestinasiWisata/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/beranda" element={<BerandaAdmin/>} />
        <Route path="/data-user" element={<DataUser/>} />
        <Route path="/tambah-user" element={<TambahDataUser/>} />
        <Route path="/edit-user/:id" element={<EditDataUser/>} />
        <Route path="/data-destinasi" element={<DataDestinasi/>} />
        <Route path="/tambah-destinasi" element={<TambahDestinasi/>} />
        <Route path="/edit-destinasi/:id" element={<EditDataDestinasi/>} />
      </Routes>
    </Router>
  );
}

export default App;

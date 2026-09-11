import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/main';
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
import DataBooking from './pages/data_booking';
import Booking from './pages/booking';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import ProtectedRoute from './layouts/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinasi" element={<DestinasiWisata />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/booking/:slug" element={<Booking />} />
            <Route path="/data-booking" element={<DataBooking />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/beranda" element={<BerandaAdmin />} />
            <Route path="/admin/data-user" element={<DataUser />} />
            <Route path="/admin/tambah-user" element={<TambahDataUser />} />
            <Route path="/admin/edit-user/:id" element={<EditDataUser />} />
            <Route path="/admin/data-destinasi" element={<DataDestinasi />} />
            <Route path="/admin/tambah-destinasi" element={<TambahDestinasi />} />
            <Route path="/admin/edit-destinasi/:id" element={<EditDataDestinasi />} />
            <Route path="/admin/data-booking" element={<DataBooking />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

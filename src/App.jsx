import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/main';
import Home from './pages';
import Destinations from './pages/Destinations';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Dashboard from './pages/admin';
import Users from './pages/admin/users';
import CreateUser from './pages/admin/users/add';
import EditUser from './pages/admin/users/update';
import AdminDestinations from './pages/admin/destinations';
import CreateDestination from './pages/admin/destinations/add';
import EditDestination from './pages/admin/destinations/update';
import Bookings from './pages/Bookings';
import Booking from './pages/booking';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import ProtectedRoute from './layouts/components/ProtectedRoute';
import AdminBookings from './pages/admin/AdminBookings';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />

          <Route element={<ProtectedRoute allowedRoles={['User']} />}>
            <Route path="/user/booking/:slug" element={<Booking />} />
            <Route path="/user/bookings" element={<Bookings />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/create" element={<CreateUser />} />
            <Route path="/admin/users/:id/edit" element={<EditUser />} />
            <Route path="/admin/destinations" element={<AdminDestinations />} />
            <Route path="/admin/destinations/create" element={<CreateDestination />} />
            <Route path="/admin/destinations/:id/edit" element={<EditDestination />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

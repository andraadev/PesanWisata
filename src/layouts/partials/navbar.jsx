import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const getUserData = () => {
    try {
      const savedUser = localStorage.getItem('user');
      if (!savedUser || savedUser === 'undefined') return null;
      return JSON.parse(savedUser);
    } catch (error) {
      console.error('Gagal parse data user dari localStorage:', error);
      return null;
    }
  };

  const user = getUserData();
  const role = user?.role; // 'Admin', 'User', or undefined (Tamu)

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Berhasil keluar.');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bolder">
          PesanWisata
          {role === 'Admin' && <span className="badge text-bg-primary ms-2">Admin</span>}{' '}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            {role !== 'Admin' && (
              <>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Beranda
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/destinasi" className="nav-link">
                    Destinasi Wisata
                  </NavLink>
                </li>
              </>
            )}
            {token && role === 'Admin' && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/admin/beranda">
                    Beranda
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/data-user">
                    Data User
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/data-destinasi">
                    Data Destinasi
                  </NavLink>
                </li>
              </>
            )}

            {token && role === 'User' && (
              <li className="nav-item">
                <NavLink to="/data-booking" className="nav-link">
                  Reservasi Saya
                </NavLink>
              </li>
            )}
          </ul>
          <div className="button-wrapper d-flex align-items-center gap-2">
            {token ? (
              <>
                <span className="me-2">Halo, {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-danger">
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-dark me-2">
                  Masuk
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

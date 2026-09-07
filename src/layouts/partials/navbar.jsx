import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bolder">
          PesanWisata
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
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Beranda
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/destinasi" className="nav-link" aria-current="page">
                Destinasi Wisata
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/data-booking" className="nav-link">
                Reservasi Saya
              </NavLink>
            </li>
          </ul>
          <div className="button-wrapper d-flex gap-2">
            <Link to="/login" className="btn btn-primary">
              Masuk
            </Link>
            <Link to="/register" className="btn btn-light">
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

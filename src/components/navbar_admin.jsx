import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
return (
<div>
<nav className="navbar navbar-expand-lg navbar-light">
    <div className="container-fluid">
        <a className="navbar-brand text-white" href="admin/beranda">
            PesanWisata
            <span className="badge text-bg-primary">Admin</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active text-white" aria-current="page" to="/beranda">Beranda</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" aria-current="page" to="/data-user">Data User</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/data-destinasi">Data Destinasi</Link>
                </li>
            </ul>
            <div className="button-wrapper d-flex">
                <a href="#" className="btn btn-danger">Keluar</a>
            </div>
        </div>
        </div>
</nav>
</div>
)
};

export default NavbarAdmin;
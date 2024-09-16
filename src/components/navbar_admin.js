import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
return (
<div>
<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <a class="navbar-brand text-white" href="admin/beranda">
            PesanWisata
            <span class="badge text-bg-primary">Admin</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <Link class="nav-link active text-white" aria-current="page" to="/beranda">Beranda</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link text-white" aria-current="page" to="/data-user">Data User</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link text-white" to="">Data Destinasi</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link text-white" to="">Data Booking</Link>
                </li>
            </ul>
            <div class="button-wrapper d-flex">
                <a href="#" class="btn btn-danger">Keluar</a>
            </div>
        </div>
        </div>
</nav>
</div>
)
};

export default NavbarAdmin;
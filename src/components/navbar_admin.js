import React from "react";

const NavbarAdmin = () => {
<>
<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <a class="navbar-brand text-white" href="index.html">
            PesanWisata
            <span class="badge text-bg-primary">Admin</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li class="nav-item">
                    <a class="nav-link active text-white" aria-current="page" href="./index.html">Beranda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" aria-current="page" href="users/index.html">Data User</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="destinations/index.html">Data Destinasi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="bookings/index.html">Data Booking</a>
                </li>
            </ul>
            <div class="button-wrapper d-flex">
                <a href="#" class="btn btn-danger">Keluar</a>
            </div>
        </div>
        </div>
</nav>
</>
};

export default NavbarAdmin;
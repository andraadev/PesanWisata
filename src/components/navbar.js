import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
    return(
<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <Link to="/" class="navbar-brand text-white">PesanWisata</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li class="nav-item">
                    <Link to="/" class="nav-link active text-white" aria-current="page" >Beranda</Link>
                </li>
                <li class="nav-item">
                    <Link to="/destinasi" class="nav-link text-white" aria-current="page" >Destinasi Wisata</Link>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="data_booking.html">Data Booking</a>
                </li>
            </ul>
            <div class="button-wrapper d-flex gap-2">
                <Link to="/login" class="btn btn-primary">Masuk</Link>
                <Link to="/register" class="btn btn-light">Daftar</Link>
            </div>
        </div>
        </div>
</nav>
    )
};

export default Navbar;
import React from "react"

const Navbar = () => {
    return(
<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <a class="navbar-brand text-white" href="index.html">PesanWisata</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li class="nav-item">
                    <a class="nav-link active text-white" aria-current="page" href="index.html">Beranda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" aria-current="page" href="destinasi_wisata.html">Destinasi
                        Wisata</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="data_booking.html">Data Booking</a>
                </li>
            </ul>
            <div class="button-wrapper d-flex gap-2">
                <a href="auth/login.html" class="btn btn-primary">Masuk</a>
                <a href="auth/register.html" class="btn btn-light">Daftar</a>
            </div>
        </div>
        </div>
</nav>
    )
};

export default Navbar;
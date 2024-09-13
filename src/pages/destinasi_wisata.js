<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking | PesanWisata App</title>

    <!-- Bootstrap Css -->
    <link href="./assets/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="./assets/css/custom.css">
</head>

<body>
    <!-- Awal Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="index.html">PesanWisata</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
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
    </nav>
    <!-- Akhir Navbar -->
    <main class="container content-wrapper">
        <h1 class="text-shadow">Destinasi Wisata yang Tersedia</h1>
        <p class="text-shadow">Silakan pilih destinasi yang kamu inginkan.</p>
        <section class="destination-cards-wrapper container-fluid row grid gap-5">
            <div class="card col-4 col-sm-12 p-0" style="width: 18rem;">
                <img src="assets/images/pura-tanah-lot-tempel-am-meer-istock-494560541.jpg" class="card-img-top"
                    alt="pura tanah lot">
                <div class="card-body">
                    <h5 class="card-title">
                        Pura Tanah Lot
                        <span class="badge text-bg-primary">Bali</span>
                    </h5>
                    <p class="card-text description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, repellat?
                    </p>
                    <a href="booking.html" class="btn btn-primary w-100">Pilih</a>
            </div>
            </div>
            <div class="card col-4 col-sm-12 p-0" style="width: 18rem;">
                <img src="assets/images/pura-tanah-lot-tempel-am-meer-istock-494560541.jpg" class="card-img-top"
                    alt="pura tanah lot">
                <div class="card-body">
                    <h5 class="card-title">
                        Pura Tanah Lot
                        <span class="badge text-bg-primary">Bali</span>
                    </h5>
                    <p class="card-text description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, repellat?
                    </p>
                    <a href="booking.html" class="btn btn-primary w-100">Pilih</a>
            </div>
            </div>
            <div class="card col-4 col-sm-12 p-0" style="width: 18rem;">
                <img src="assets/images/pura-tanah-lot-tempel-am-meer-istock-494560541.jpg" class="card-img-top"
                    alt="pura tanah lot">
                <div class="card-body">
                    <h5 class="card-title">
                        Pura Tanah Lot
                        <span class="badge text-bg-primary">Bali</span>
                    </h5>
                    <p class="card-text description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, repellat?
                    </p>
                    <a href="booking.html" class="btn btn-primary w-100">Pilih</a>
            </div>
            </div>
        </section>
    </main>

  <!-- Awal Bagian Footer -->
    <footer class="text-center mt-5">
        <p>© 2024, PesanWisata App. All rights reserved </p>
    </footer>
    <!-- Akhir Bagian Footer -->

    <!-- Bootstrap JS -->
    <script src="./assets/js/bootstrap.min.js"></script>
</body>

</html>
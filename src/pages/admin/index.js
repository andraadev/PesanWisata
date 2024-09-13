<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beranda Admin | PesanWisata App</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/custom.css">
</head>

<body class="no-scrollbar">
    <!-- Awal Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="index.html">
                PesanWisata
                <span class="badge text-bg-primary">Admin</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
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
    </nav>
    <!-- Akhir Navbar -->

    <!-- Konten Utama -->
    <!-- Awal Bagian Jumbotron -->
    <section class="jumbotron container" style="min-height: 88vh;">
        <h1 class="jumbotron-header text-shadow">Beranda</h1>
        <p class="jumbotron-content text-shadow">Selamat datang, Admin!</p>
    </section>
    <!-- Akhir Bagian Jumbotron -->

    <!-- Awal Bagian Footer -->
    <footer class="text-center">
        <p>© 2024, PesanWisata App. All rights reserved </p>
    </footer>
    <!-- Akhir Bagian Footer -->

    <!-- Bootstrap JS -->
    <script src="../assets/js/bootstrap.bundle.min.js"></script>
</body>

</html>
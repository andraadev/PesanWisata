<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Data Booking | PesanWisata App</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../../assets/css/bootstrap.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="../../assets/css/custom.css">
</head>

<body>
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
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active text-white" aria-current="page" href="./index.html">Beranda</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" aria-current="page" href="../users/index.html">Data User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="index.html">Data Destinasi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="index.html">Data Booking</a>
                    </li>
                </ul>
                <div class="button-wrapper d-flex">
                    <a href="#" class="btn btn-danger">Keluar</a>
                </div>
            </div>
    </nav>
    <!-- Akhir Navbar -->

    <!-- Awal Bagian Konten -->
    <main class="container content-wrapper" style="min-height: 80vh;">
        <a href="index.html" class="btn btn-secondary">Kembali ke Halaman Data Booking</a>
        <h1 class="text-shadow">Tambah Data Booking</h1>
        <p class="text-shadow">-</p>
        <form action="#" method="POST" class="form-wrapper card p-4">
            <input type="hidden" name="user_id" value="">
            <input type="hidden" name="destination_id" value="">
            <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                    <label for="nama" class="form-label">Nama Kamu</label>
                    <input type="text" class="form-control" id="nama" value="" disabled>
                </div>
                <div class="col-sm-12 col-md-6">
                    <label for="destinasi_tujuan" class="form-label">Destinasi Tujuan</label>
                    <input type="text" name="destinasi_tujuan" id="nama" class="form-control" value="" disabled>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                    <label for="booking_date" class="form-label">Tanggal Booking</label>
                    <input type="date" name="booking_date" id="booking_date" class="form-control">
                </div>
                <div class="col-sm-12 col-md-6">
                    <label for="status" class="form-label">Status</label><br>
                    <input type="radio" name="status" id="status" checked class="form-check-input">
                    <label for="status">Selesai</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </main>
    <!-- Akhir Bagian Konten -->

    <!-- Awal Bagian Footer -->
    <footer class="text-center mt-5">
        <p>© 2024, PesanWisata App. All rights reserved </p>
    </footer>
    <!-- Akhir Bagian Footer -->

    <!-- Bootstrap JS -->
    <script src="../../assets/js/bootstrap.bundle.min.js"></script>
</body>

</html>
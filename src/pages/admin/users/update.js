<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Data | PesanWisata App</title>

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
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li class="nav-item">
                        <a class="nav-link active text-white" aria-current="page" href="./index.html">Beranda</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" aria-current="page" href="users/index.html">Data User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="../destinations/index.html">Data Destinasi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="../bookings/index.html">Data Booking</a>
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
        <a href="index.html" class="btn btn-secondary">Kembali ke Halaman Data User</a>
        <h1 class="text-shadow">Edit Data User</h1>
        <p class="text-shadow">Di halaman ini, kamu dapat mengubah detail data user.</p>
        <div class="card p-4">
            <form action="" method="post">
                <div class="row">
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="nama_lengkap" class="form-label">Nama</label>
                        <input type="text" name="name" id="nama_lengkap" class="form-control" autofocus>
                    </div>
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" name="email" id="email" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="password" class="form-label">Kata Sandi</label>
                        <input type="password" name="password" id="password" class="form-control">
                    </div>
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="password" class="form-label">Konfirmasi Kata Sandi</label>
                        <input type="password" name="password" id="password" class="form-control">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mb-3">Submit</button>
            </form>
        </div>
    </main>
    <!-- Akhir Bagian Konten -->

    <!-- Awal Bagian Footer -->
    <footer class="text-center mt-5">
        <p>© 2024, PesanWisata App. All rights reserved </p>
    </footer>
    <!-- Akhir Bagian Footer -->

    <!-- Bootstrap JS -->
    <script src="./assets/js/bootstrap.min.js"></script>
</body>

</html>
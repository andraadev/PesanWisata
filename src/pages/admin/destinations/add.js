<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Data Destinasi | PesanWisata App</title>

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
                        <a class="nav-link active text-white" aria-current="page" href="../index.html">Beranda</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" aria-current="page" href="../users/index.html">Data User</a>
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
        <a href="index.html" class="btn btn-secondary">Kembali ke Halaman Data Destinasi</a>
        <h1 class="text-shadow">Tambah Data Destinasi</h1>
        <p class="text-shadow">Di halaman ini, kamu dapat mendaftarkan destinasi wisata baru.</p>
        <div class="card p-4">
            <form action="" method="post">
                <div class="row">
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="nama" class="form-label">Nama</label>
                        <input type="text" name="name" id="nama" class="form-control" autofocus>
                    </div>
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="slug" class="form-label">Slug</label>
                        <input type="text" name="slug" id="slug" class="form-control" disabled>
                    </div>
                </div>
                <div class="row">
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="lokasi" class="form-label">Lokasi</label>
                        <input type="text" name="lokasi" id="lokasi" class="form-control">
                    </div>
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="deskripsi" class="form-label">Deskripsi</label>
                        <textarea name="deskripsi" id="deskripsi" class="form-control"></textarea>
                    </div>
                </div>
                <div id="input-group" class="mb-3">
                    <label for="gambar" class="form-label">Gambar</label>
                    <input type="file" name="image_url" id="gambar" class="form-control">
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
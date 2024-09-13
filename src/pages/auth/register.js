<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register | PesanWisata App</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/custom.css">
</head>

<body class="container mt-5" style="min-height: 90vh;">
    <a href="../index.html" class="btn btn-secondary">Kembali ke Halaman Utama</a>
    <h1 class="text-shadow">Register</h1>
    <p class="text-shadow">Silakan masukkan nama, email dan password untuk membuat akun baru.</p>
    <form action="" method="POST" class="card p-3">
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
        <button type="submit" class="btn btn-primary">Daftar</button>
        <p class="register-account text-center mt-3">
            Sudah memiliki akun? <a href="login.html">Masuk</a> untuk memulai.
        </p>
    </form>
</body>

</html>
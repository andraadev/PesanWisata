<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | PesanWisata App</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/custom.css">
</head>

<body class="container mt-5" style="min-height: 90vh;">
    <a href="../index.html" class="btn btn-secondary">Kembali ke Halaman Utama</a>
    <h1 class="text-shadow">Login</h1>
    <p class="text-shadow">Silakan masukkan email kamu dan password untuk melanjutkan.</p>
    <form action="" method="POST" class="card p-3">
        <div id="input-group" class="mb-3">
            <label for="email" class="form-label">Email</label><br>
            <input type="email" name="email" id="email" class="form-control">
        </div>
        <div id="input-group" class="mb-3">
            <label for="password" class="form-label">Kata Sandi</label><br>
            <input type="password" name="password" id="password" class="form-control">
        </div>
        <a href="../admin/index.html" type="submit" class="btn btn-primary">Masuk</a>
        <p class="register-account text-center mt-3">
            Tidak memiliki akun? <a href="register.html">Buat akun baru</a> untuk memulai.
        </p>
    </form>
</body>

</html>
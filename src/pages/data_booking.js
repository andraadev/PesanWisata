<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Data Booking | PesanWisata App</title>

   <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="./assets/css/bootstrap.min.css">

   <!-- Custom CSS -->
   <link rel="stylesheet" href="./assets/css/custom.css">
</head>

<body>
   <!-- Awal Navbar -->
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
   </nav>
   <!-- Akhir Bagian Navbar -->

   <!-- Awal Bagian Konten -->
   <main class="container content-wrapper" style="min-height: 80vh;">
      <h1 class="text-shadow">Data Booking</h1>
      <p class="text-shadow">Di halaman ini, kamu dapat melihat destinasi mana saja yang pernah kamu booking.</p>
      <div class="card p-4 table-responsive">
         <table class="table ">
            <thead>
               <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Destinasi</th>
                  <th scope="col">Tanggal Booking</th>
                  <th scope="col">Tanggal Dibuat</th>
                  <th scope="col">Tanggal Diubah</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <th scope="row">1</th>
                  <td>John Doe</td>
                  <td>Bali</td>
                  <td>11 September 2024</td>
                  <td>2024-09-10 00:00</td>
                  <td>Tidak Ada</td>
               </tr>
            </tbody>
         </table>
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
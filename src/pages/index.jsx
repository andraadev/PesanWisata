import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <body class="no-scrollbar">
    <Navbar/>
    <section class="jumbotron container">
        <h1 class="jumbotron-header text-shadow">PesanWisata</h1>
        <p class="jumbotron-content text-shadow">Aplikasi ini akan membantu kamu untuk memesan destinasi wisata tertentu.</p>
        <Link to="/destinasi" class="cta-btn btn btn-lg bg-white text-dark rounded-pill" role="button">Pesan
            Sekarang</Link>
    </section>
    <Footer/>
</body>
    );
};

export default Home;


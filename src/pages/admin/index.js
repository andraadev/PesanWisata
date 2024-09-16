import React from "react";
import NavbarAdmin from "../../components/navbar_admin";
import Footer from "../../components/footer";
const BerandaAdmin = () => {
return(
<div class="no-scrollbar">
   <NavbarAdmin/>
    <section class="jumbotron container">
        <h1 class="jumbotron-header text-shadow">Beranda</h1>
        <p class="jumbotron-content text-shadow">Selamat datang, Admin!</p>
    </section>
    <Footer/>
</div>
);
}
export default BerandaAdmin;
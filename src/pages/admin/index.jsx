import React from "react";
import NavbarAdmin from "../../components/navbar_admin";
import Footer from "../../components/footer";
const BerandaAdmin = () => {
return(
<div className="no-scrollbar">
   <NavbarAdmin/>
    <section className="jumbotron container">
        <h1 className="jumbotron-header text-shadow">Beranda</h1>
        <p className="jumbotron-content text-shadow">Selamat datang, Admin!</p>
    </section>
    <Footer/>
</div>
);
}
export default BerandaAdmin;
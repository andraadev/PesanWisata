import React from 'react';
import NavbarAdmin from '../../layouts/partials/navbar_admin';
import Footer from '../../layouts/partials/footer';
const BerandaAdmin = () => {
  return (
    <div className="no-scrollbar">
      <NavbarAdmin />
      <section className="jumbotron container">
        <h1 className="jumbotron-header text-shadow">Beranda</h1>
        <p className="jumbotron-content text-shadow">Selamat datang, Admin!</p>
      </section>
      <Footer />
    </div>
  );
};
export default BerandaAdmin;

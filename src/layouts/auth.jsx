import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Footer from './partials/footer';

const AuthLayout = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Pesan Wisata');
  const [pageSubtitle, setPageSubtitle] = useState('');

  useEffect(() => {
    document.title = `${pageTitle} | PesanWisata`;
  }, [pageTitle]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1 py-3">
        <div className="row g-3">
          <main className="col-12">
            <Link to="/" className="btn btn-secondary mb-3">
              Kembali ke Halaman Utama
            </Link>
            <div className="mb-3">
              <h2 className="fw-bold text-white text-shadow">{pageTitle}</h2>
              {pageSubtitle && <p className="text-white text-shadow mb-0">{pageSubtitle}</p>}
            </div>

            <Outlet context={{ setPageTitle, setPageSubtitle }} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;

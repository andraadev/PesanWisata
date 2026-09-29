import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAPI, APIError } from '../services/api';

const Destinations = () => {
  const { setPageTitle, setPageSubtitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Destinasi Wisata yang Tersedia');
    setPageSubtitle('Silakan pilih destinasi yang kamu ingin kunjungi.');
  }, [setPageTitle, setPageSubtitle]);

  const {
    data: destinasiData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['destinasi'],
    queryFn: async ({ signal }) => {
      const res = await fetchAPI('/destinations', { signal });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <section className="destination-cards-wrapper container-fluid row grid gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card col-12 col-md-6 col-lg-4 p-0" style={{ width: '18rem' }}>
              <div className="card-img-top placeholder-glow" style={{ height: '12rem' }}>
                <span
                  className="placeholder col-12 placeholder-wave"
                  style={{ height: '100%', display: 'block' }}
                ></span>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  <span className="placeholder col-6 placeholder-wave"></span>
                  <span className="badge text-bg-primary ms-2" style={{ visibility: 'hidden' }}>
                    &nbsp;
                  </span>
                </h5>
                <p className="card-text description">
                  <span className="placeholder col-12 placeholder-wave d-block"></span>
                  <span className="placeholder col-10 placeholder-wave d-block mt-2"></span>
                  <span className="placeholder col-8 placeholder-wave d-block mt-2"></span>
                </p>
                <div className="d-grid">
                  <span className="btn btn-primary disabled placeholder col-12 placeholder-wave">
                    &nbsp;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center">
        <div className="alert alert-info mb-2">Gagal memuat data. Silakan coba lagi nanti.</div>;
        <button type="button" className="btn btn-primary" onClick={refetch}>
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <section className="destination-cards-wrapper row g-4">
        {destinasiData.map((destinasi) => (
          <div key={destinasi.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <img
                src={destinasi.image_url}
                className="card-img-top"
                alt={destinasi.name}
                loading="lazy"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {destinasi.name}
                  <span className="badge text-bg-primary ms-2">{destinasi.location}</span>
                </h5>
                <p className="card-text description">{destinasi.description}</p>
                <Link to={`/user/booking/${destinasi.slug}`} className="btn btn-primary w-100">
                  Pilih
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Destinations;

import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { fetchAPI, APIError } from '../services/api';

const DestinasiWisata = () => {
  const [destinasiData, setDestinasiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setPageTitle, setPageSubtitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Destinasi Wisata yang Tersedia');
    setPageSubtitle('Silakan pilih destinasi yang kamu ingin kunjungi.');
  }, [setPageTitle, setPageSubtitle]);

  useEffect(() => {
    const fetchDestinasi = async () => {
      try {
        const res = await fetchAPI('/destinations');

        if (Array.isArray(res?.data) && res.data.length > 0) {
          setDestinasiData(res.data);
        } else {
          setError('Data destinasi belum tersedia. Silakan coba lagi nanti.');
        }
      } catch (err) {
        if (err instanceof APIError) {
          setError(err.message);
        } else {
          setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDestinasi();
  }, []);

  if (loading) {
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

  if (error) {
    return <div className="alert alert-info">{error}</div>;
  }

  return (
    <div>
      <section className="destination-cards-wrapper container-fluid row grid gap-5">
        {destinasiData.map((destinasi) => (
          <div key={destinasi.id} className="card col-4 col-sm-12 p-0" style={{ width: '18rem' }}>
            <img
              src={destinasi.image_url}
              className="card-img-top"
              alt={destinasi.name}
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">
                {destinasi.name}
                <span className="badge text-bg-primary">Bali</span>
              </h5>
              <p className="card-text description">{destinasi.description}</p>
              <Link to={`/booking/${destinasi.slug}`} className="btn btn-primary w-100">
                Pilih
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DestinasiWisata;

import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';

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
        const response = await fetch('http://localhost:8000/api/destinations');

        if (!response.ok) {
          throw new Error(`Gagal memuat data destinasi. Silakan coba lagi nanti.`);
        }
        const data = await response.json();
        if (Array.isArray(data.data)) {
          if (data.data.length === 0) {
            setError('Data destinasi belum tersedia. Silakan coba lagi nanti.');
          } else {
            setDestinasiData(data.data);
          }
        } else {
          setError('Terjadi kesalahan saat memuat data destinasi');
        }
      } catch (error) {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    fetchDestinasi();
  }, []);

  if (loading) {
    return <p className="text-white">Sedang mengambil data destinasi dari server...</p>;
  }

  if (error) {
    return <div className="alert alert-info">{error}</div>;
  }

  return (
    <div>
      <section className="destination-cards-wrapper container-fluid row grid gap-5">
        {destinasiData.map((destinasi) => (
          <div className="card col-4 col-sm-12 p-0" style={{ width: '18rem' }}>
            <img
              src="assets/images/pura-tanah-lot-tempel-am-meer-istock-494560541.jpg"
              className="card-img-top"
              alt="pura tanah lot"
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

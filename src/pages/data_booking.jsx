import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';

const DataBooking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setPageTitle, setPageSubtitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Reservasi Saya');
    setPageSubtitle(
      'Di halaman ini, kamu dapat melihat destinasi mana saja yang pernah kamu pesan tiketnya.'
    );
  }, [setPageTitle, setPageSubtitle]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/booking');
        if (!response.ok) {
          throw new Error(`Gagal memuat data reservasi. Silakan coba lagi nanti.`);
        }

        const data = await response.json();
        if (Array.isArray(data.data)) {
          if (data.data.length === 0) {
            setError('Data reservasi belum tersedia. Silakan coba lagi nanti.');
          } else {
            setBookingData(data.data);
          }
        } else {
          setError('Terjadi kesalahan saat memuat data reservasi');
        }
      } catch (error) {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, []);
  return (
    <div>
      <div className="card p-4 table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Destinasi</th>
              <th scope="col">Tanggal Booking</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Sedang mengambil data reservasi dari server...
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  {error}
                </td>
              </tr>
            )}
            {bookingData.map((booking, no) => (
              <tr key={booking.id}>
                <th scope="row">{no + 1}</th>
                <td>{booking.name}</td>
                <td>{booking.destination}</td>
                <td>{booking.booking_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DataBooking;

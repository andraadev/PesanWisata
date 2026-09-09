import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { fetchAPI, APIError } from '../services/api';

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
        const res = await fetchAPI('/booking');

        if (Array.isArray(res?.data) && res.data.length > 0) {
          setBookingData(res.data);
        } else {
          setError('Belum ada data reservasi. Mulai pesan sekarang!');
        }
      } catch (error) {
        if (error instanceof APIError) {
          setError(error.message);
        } else {
          setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
        }
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
            {/* {loading && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Sedang mengambil data reservasi dari server...
                </td>
              </tr>
            )} */}
            {loading && (
              <>
                {[...Array(5)].map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    <th scope="row">
                      <span className="placeholder col-12 placeholder-wave"></span>
                    </th>
                    <td>
                      <span className="placeholder col-8 placeholder-wave"></span>
                    </td>
                    <td>
                      <span className="placeholder col-10 placeholder-wave"></span>
                    </td>
                    <td>
                      <span className="placeholder col-9 placeholder-wave"></span>
                    </td>
                  </tr>
                ))}
              </>
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

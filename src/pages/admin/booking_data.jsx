import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchAPI, APIError } from '../../services/api';

const BookingData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingsData, setBookingsData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Data Reservasi');
  }, [setPageTitle]);

  // For Display Toast Message
  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsFetching(true);
        const result = await fetchAPI('/admin/booking');

        if (Array.isArray(result?.data)) {
          setBookingsData(result.data);
        } else {
          console.error(
            '[Fetch Destinations Error]: Expecting array in response.data, got:',
            result?.data
          );
          setError('Gagal menampilkan data reservasi. Silakan segarkan (refresh) halaman.');
        }
      } catch (error) {
        if (error instanceof APIError) {
          if (error.status === 401) {
            setError('Sesi telah berakhir, silakan login kembali.');
          } else {
            setError('Gagal memuat data reservasi. Silakan coba lagi nanti.');
          }
        } else {
          setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      {error && (
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
      )}
      {toastMessage && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div
            className="toast show align-items-center text-white bg-success border-0"
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body">{toastMessage}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToastMessage(null)}
              ></button>
            </div>
          </div>
        </div>
      )}
      <div className="card p-4 table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Destinasi</th>
              <th scope="col">Tanggal Reservasi</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {isFetching && (
              <>
                {[...Array(3)].map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    <th scope="row">
                      <span className="placeholder col-3 placeholder-wave"></span>
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
                    <td>
                      <span className="placeholder col-9 placeholder-wave"></span>
                    </td>
                  </tr>
                ))}
              </>
            )}
            {bookingsData.map((booking, index) => (
              <tr key={booking.id}>
                <th scope="row">{index + 1}</th>
                <td>{booking.name}</td>
                <td>{booking.destination}</td>
                <td>{booking.booking_date}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingData;

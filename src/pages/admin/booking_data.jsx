import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchAPI, APIError } from '../../services/api';
import TableSkeleton from '../../layouts/components/TableSkeleton';

const BookingData = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [bookingsData, setBookingsData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Data Reservasi');
  }, [setPageTitle]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsFetching(true);
        const result = await fetchAPI('/admin/booking');

        if (Array.isArray(result?.data)) {
          setBookingsData(result.data);
        } else {
          console.error(
            '[Fetch Bookings Error]: Expecting array in response.data, got:',
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
            {isFetching && <TableSkeleton columns={5} />}
            {!isFetching && error && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-danger">
                  {error}
                </td>
              </tr>
            )}

            {!isFetching &&
              !error &&
              bookingsData.map((booking, index) => (
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

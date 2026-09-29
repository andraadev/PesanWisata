import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAPI, APIError } from '../services/api';
import TableSkeleton from '../layouts/components/TableSkeleton';
import Notification from '../layouts/components/Notification';
import TableError from '../layouts/components/TableError';

const DataBooking = () => {
  const { setPageTitle, setPageSubtitle } = useOutletContext();

  const navigate = useNavigate();

  const location = useLocation();
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    setPageTitle('Reservasi Saya');
    setPageSubtitle(
      'Di halaman ini, kamu dapat melihat destinasi mana saja yang pernah kamu pesan tiketnya.'
    );
  }, [setPageTitle, setPageSubtitle]);

  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const {
    data: bookingData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['booking'],
    queryFn: async ({ signal }) => {
      const res = await fetchAPI('/booking', { signal });
      return res.data;
    },
  });
  return (
    <div>
      {toastMessage && (
        <Notification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

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
            {isLoading && <TableSkeleton columns={4} />}

            {!isLoading && isError && <TableError colSpan={4} onRetry={refetch} />}

            {!isLoading && !isError && bookingData.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-muted">
                  Belum ada reservasi.
                </td>
              </tr>
            )}

            {!isLoading &&
              !isError &&
              bookingData.map((booking, no) => (
                <tr key={booking.id}>
                  <th scope="row">{no + 1}</th>
                  <td>{booking.user?.name || '-'}</td>
                  <td>{booking.destination?.name || '-'}</td>
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

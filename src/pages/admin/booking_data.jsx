import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAPI, APIError } from '../../services/api';
import TableSkeleton from '../../layouts/components/TableSkeleton';

const BookingData = () => {
  const [toastMessage, setToastMessage] = useState(null);

  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Data Reservasi');
  }, [setPageTitle]);

  const {
    data: bookingsData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async ({ signal }) => {
      const result = await fetchAPI('/admin/booking', { signal });
      return result.data;
    },
  });

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
            {isLoading && <TableSkeleton columns={5} />}

            {!isLoading && isError && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-danger">
                  Gagal memuat data reservasi. Silakan coba lagi nanti.
                </td>
              </tr>
            )}

            {!isLoading &&
              !isError &&
              bookingsData.map((booking, index) => (
                <tr key={booking.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{booking.user?.name || '-'}</td>
                  <td>{booking.destination?.name || '-'}</td>
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

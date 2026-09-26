import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAPI, APIError } from '../../../services/api';
import Notification from '../../../layouts/components/Notification';
import TableSkeleton from '../../../layouts/components/TableSkeleton';

const DataDestinasi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState(null);

  const { setPageTitle, setPageSubtitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Data Destinasi');
    setPageSubtitle('Di halaman ini, kamu dapat melihat destinasi wisata yang sudah terdaftar.');
  }, [setPageTitle, setPageSubtitle]);

  // For Display Toast Message
  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const {
    data: destinationsData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: async ({ signal }) => {
      const result = await fetchAPI('/admin/destinations', { signal });
      return result.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => fetchAPI(`/admin/destinations/${id}`, { method: 'DELETE' }),
    onSuccess: (data) => {
      setToastMessage(data?.message || 'Data berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
    },
    onError: () => {
      alert('Gagal menghapus data. Silakan coba beberapa saat lagi.');
    },
  });

  function handleDelete(id) {
    if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <div>
      {toastMessage && (
        <Notification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      <div className="card">
        <div className="card-header">
          <Link to="/admin/tambah-destinasi" className="btn btn-primary">
            Tambah
          </Link>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Lokasi</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Gambar</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <TableSkeleton columns={6} />}

              {!isLoading && isError && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-danger">
                    Gagal memuat data destinasi. Silakan coba lagi nanti.
                  </td>
                </tr>
              )}

              {!isLoading &&
                !isError &&
                destinationsData.map((destination, index) => (
                  <tr key={destination.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{destination.name}</td>
                    <td>{destination.location}</td>
                    <td>{destination.description}</td>
                    <td>
                      <img src={destination.image_url} alt={destination.name} width={100} />
                    </td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/admin/edit-destinasi/${destination.id}`}
                        className="btn btn-warning text-dark"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(destination.id)}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataDestinasi;

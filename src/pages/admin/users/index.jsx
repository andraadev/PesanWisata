import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAPI } from '../../../services/api';
import Notification from '../../../layouts/components/Notification';
import TableSkeleton from '../../../layouts/components/TableSkeleton';

const DataUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState(null);

  const { setPageTitle, setPageSubtitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Data User');
    setPageSubtitle(
      'Di halaman ini, kamu dapat melihat siapa saja yang sudah terdaftar di aplikasi ini.'
    );
  }, [setPageTitle, setPageSubtitle]);

  const {
    data: usersData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async ({ signal }) => {
      const res = await fetchAPI('/admin/users', { signal });
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => fetchAPI(`/admin/users/${id}`, { method: 'DELETE' }),
    onSuccess: (data) => {
      setToastMessage(data?.message || 'Data berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      alert('Gagal menghapus data. Silakan coba beberapa saat lagi.');
    },
  });

  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

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
          <Link to="/admin/tambah-user" className="btn btn-primary">
            Tambah
          </Link>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <TableSkeleton columns={5} />}

              {!isLoading && isError && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-danger">
                    Gagal memuat data user. Silakan coba lagi nanti.
                  </td>
                </tr>
              )}

              {!isLoading &&
                !isError &&
                usersData.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge text-bg-${user.role === 'Admin' ? 'primary' : 'secondary'}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/admin/edit-user/${user.id}`}
                        className="btn btn-warning text-dark"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={deleteMutation.isPending}
                        onClick={() => handleDelete(user.id)}
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

export default DataUser;

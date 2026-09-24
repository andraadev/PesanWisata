import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchAPI, APIError } from '../../../services/api';
import Notification from '../../../layouts/components/Notification';
import TableSkeleton from '../../../layouts/components/TableSkeleton';

const DataUser = () => {
  const [usersData, setUsersData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const [toastMessage, setToastMessage] = useState(null);

  const { setPageTitle, setPageSubtitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Data User');
    setPageSubtitle(
      'Di halaman ini, kamu dapat melihat siapa saja yang sudah terdaftar di aplikasi ini.'
    );
  }, [setPageTitle, setPageSubtitle]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsFetching(true);
        const result = await fetchAPI('/admin/users');
        if (Array.isArray(result?.data)) {
          setUsersData(result.data);
        } else {
          setError('Gagal menampilkan data user. Silakan segarkan (refresh) halaman.');
        }
      } catch (error) {
        if (error instanceof APIError) {
          if (error.status === 401) {
            setError('Sesi telah berakhir, silakan login kembali.');
          } else {
            setError('Gagal memuat data user. Silakan coba lagi nanti.');
          }
        } else {
          setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchUsers();
  }, []);

  // For Display Toast Message
  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  async function handleDelete(id) {
    if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
      try {
        const data = await fetchAPI(`/admin/users/${id}`, {
          method: 'DELETE',
        });

        setToastMessage(data.message || 'Data berhasil dihapus');
        setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        if (error instanceof APIError) {
          if (error.status === 401) {
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
            navigate('/login');
          } else {
            alert('Gagal menghapus data. Silakan coba beberapa saat lagi.');
          }
        } else {
          alert('Tidak dapat terhubung ke server.');
        }
      }
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
                        onClick={() => handleDelete(user.id)}
                      >
                        Hapus
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

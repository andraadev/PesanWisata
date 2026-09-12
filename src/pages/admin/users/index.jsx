import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { fetchAPI, APIError } from '../../../services/api';

const DataUser = () => {
  const [usersData, setUsersData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

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
          console.error(
            '[Fetch Users Error]: Expecting array in response.data, got:',
            result?.data
          );
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

  async function handleDelete(id) {
    if (
      window.confirm(
        'Apakah anda yakin? Tindakan ini mungkin memengaruhi data user ini di tabel lain.'
      )
    ) {
      try {
        const data = await fetchAPI(`/admin/users/${id}`, {
          method: 'DELETE',
        });

        alert(data.message);
        setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        if (err instanceof APIError) {
          if (err.status === 401) {
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
      <div className="card p-4 table-responsive">
        <Link to="/admin/tambah-user" className="btn btn-primary mb-3">
          Tambah
        </Link>
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
            {isFetching && (
              <>
                {[...Array(5)].map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    <th scope="row">
                      <span className="placeholder col-12 placeholder-wave"></span>
                    </th>
                    <td>
                      <span className="placeholder col-12 placeholder-wave"></span>
                    </td>
                    <td>
                      <span className="placeholder col-12 placeholder-wave"></span>
                    </td>
                    <td>
                      <span className="placeholder col-12 placeholder-wave"></span>
                    </td>
                    <td>
                      <span className="placeholder col-12 placeholder-wave"></span>
                    </td>
                  </tr>
                ))}
              </>
            )}
            {error && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  {error}
                </td>
              </tr>
            )}
            {usersData.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="d-flex gap-2">
                  <Link to={`/admin/edit-user/${user.id}`} className="btn btn-warning text-dark">
                    Edit
                  </Link>
                  <a href="#" className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                    Hapus
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataUser;

import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchAPI, APIError } from '../../../services/api';
import Notification from '../../../layouts/components/Notification';
import TableSkeleton from '../../../layouts/components/TableSkeleton';

const DataDestinasi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [destinationsData, setDestinationsData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsFetching(true);
        const result = await fetchAPI('/admin/destinations');

        if (Array.isArray(result?.data)) {
          setDestinationsData(result.data);
        } else {
          setError('Gagal menampilkan data destinasi. Silakan segarkan (refresh) halaman.');
        }
      } catch (error) {
        if (error instanceof APIError) {
          if (error.status === 401) {
            setError('Sesi telah berakhir, silakan login kembali.');
          } else {
            setError('Gagal memuat data destinasi. Silakan coba lagi nanti.');
          }
        } else {
          setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchDestinations();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
      try {
        const data = await fetchAPI(`/admin/destinations/${id}`, {
          method: 'DELETE',
        });

        setToastMessage(data.message || 'Data berhasil dihapus');
        setDestinationsData((prevDestinations) =>
          prevDestinations.filter((destination) => destination.id !== id)
        );
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
              {isFetching && <TableSkeleton columns={6} />}

              {!isFetching && error && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-danger">
                    {error}
                  </td>
                </tr>
              )}
              {!isFetching &&
                !error &&
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
                      <a
                        href="#"
                        className="btn btn-danger"
                        onClick={() => handleDelete(destination.id)}
                      >
                        Hapus
                      </a>
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

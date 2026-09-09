import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchAPI, APIError } from '../services/api';

const Booking = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setPageTitle } = useOutletContext();

  const [users, setUsers] = useState([]);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    booking_date: '',
    user_id: '',
    status: 'Selesai',
  });

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setPageTitle('Form Reservasi');
  }, [setPageTitle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, destRes] = await Promise.all([
          fetchAPI('/users'),
          fetchAPI(`/destinations/${slug}`),
        ]);

        if (usersRes?.data) setUsers(usersRes.data);
        if (destRes?.data) {
          setDestination(destRes.data);
        }
      } catch (err) {
        setError(err.message || 'Gagal memuat data awal.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    const payload = {
      ...formData,
      user_id: Number(formData.user_id) || 0,
      destination_id: destination?.id || 0,
    };

    try {
      await fetchAPI('/booking', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      alert('Booking berhasil ditambahkan');
      navigate('/data-booking');
    } catch (error) {
      if (err instanceof APIError && err.status === 422) {
        setValidationErrors(error.errors || {});
      } else {
        setError(err.message || 'Terjadi kesalahan saat menyimpan booking.');
      }
    }
  };

  if (loading) {
    return (
      <div className="card p-4 placeholder-glow">
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="placeholder col-4 mb-2"></div>
            <div className="placeholder col-12 py-3 rounded"></div>
          </div>
          <div className="col-md-6">
            <div className="placeholder col-4 mb-2"></div>
            <div className="placeholder col-12 py-3 rounded"></div>
          </div>
        </div>
        <div className="placeholder col-3 py-3 rounded btn-primary"></div>
      </div>
    );
  }
  return (
    <div>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-wrapper card p-4">
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="booking_date" className="form-label">
              Tanggal Booking
            </label>
            <input
              type="date"
              name="booking_date"
              id="booking_date"
              className={`form-control ${validationErrors.booking_date ? 'is-invalid' : ''}`}
              value={formData.booking_date}
              onChange={handleChange}
            />
            {validationErrors.booking_date && (
              <div className="invalid-feedback">{validationErrors.booking_date[0]}</div>
            )}
          </div>

          <div className="col-sm-12 col-md-6">
            <label htmlFor="user_id" className="form-label">
              Nama Kamu
            </label>
            <select
              name="user_id"
              id="user_id"
              className={`form-select ${validationErrors.user_id ? 'is-invalid' : ''}`}
              value={formData.user_id}
              onChange={handleChange}
            >
              <option value="">Pilih User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {validationErrors.user_id && (
              <div className="invalid-feedback">{validationErrors.user_id[0]}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="destinasi_tujuan" className="form-label">
              Destinasi Tujuan
            </label>
            <input type="text" value={destination?.name || ''} className="form-control" disabled />
          </div>

          <div className="col-sm-12 col-md-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <div>
              <input
                type="radio"
                name="status"
                id="status"
                checked={formData.status === 'Selesai'}
                className="form-check-input me-2"
                value="Selesai"
                onChange={handleChange}
              />
              <label htmlFor="status">Selesai</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Reservasi
        </button>
      </form>
    </div>
  );
};

export default Booking;

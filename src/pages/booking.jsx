import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchAPI, APIError } from '../services/api';

const Booking = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setPageTitle } = useOutletContext();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [destination, setDestination] = useState(null);

  const [formData, setFormData] = useState({
    booking_date: '',
    user_id: currentUser?.id || '',
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
        setIsFetching(true);

        const destRes = await fetchAPI(`/destinations/${slug}`);

        if (destRes?.data) {
          setDestination(destRes.data);
        }
      } catch (error) {
        console.error('[Fetch User Error]:', error);
        setError('Gagal mengambil data destinasi. Silakan coba lagi nanti');
      } finally {
        setIsFetching(false);
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

    if (!currentUser?.id) {
      setError('Anda belum login atau data sesi tidak ditemukan.');
      return;
    }

    const payload = {
      ...formData,
      user_id: Number(formData.user_id) || currentUser?.id || 0,
      destination_id: destination?.id || 0,
    };

    try {
      setIsSubmitting(true);
      await fetchAPI('/booking', {
        method: 'POST',
        body: payload,
      });

      navigate('/data-booking', {
        state: { message: 'Booking berhasil ditambahkan' },
      });
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof APIError) {
        if (error.status === 422) {
          setValidationErrors(error.errors || {});
        } else if (error.status === 401) {
          navigate('/login', {
            state: { message: 'Sesi Anda telah berakhir. Silakan login kembali.' },
          });
        } else {
          setError('Gagal menambahkan data reservasi. Silakan coba lagi nanti.');
        }
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      {isFetching ? (
        <div className="card p-4 placeholder-glow">
          <div className="row mb-3">
            <div className="col-sm-12 col-md-6">
              <label className="form-label">Tanggal Booking</label>
              <div
                className="form-control placeholder col-12 placeholder-wave"
                style={{ height: '38px' }}
              ></div>
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="form-label">Nama Kamu</label>
              <div
                className="form-control placeholder col-12 placeholder-wave"
                style={{ height: '38px' }}
              ></div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-6">
              <label className="form-label">Destinasi Tujuan</label>
              <div
                className="form-control placeholder col-12 placeholder-wave"
                style={{ height: '38px' }}
              ></div>
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="form-label">Status</label>
              <div
                className="form-control placeholder col-12 placeholder-wave"
                style={{ height: '38px' }}
              ></div>
            </div>
          </div>
          <div className="placeholder py-3 rounded btn-primary"></div>
        </div>
      ) : (
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
              <input
                type="text"
                id="user_name"
                className="form-control"
                value={currentUser?.name || ''}
                disabled
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-12 col-md-6">
              <label htmlFor="destinasi_tujuan" className="form-label">
                Destinasi Tujuan
              </label>
              <input
                type="text"
                value={destination?.name || ''}
                className="form-control"
                disabled
              />
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

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Reservasi'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Booking;

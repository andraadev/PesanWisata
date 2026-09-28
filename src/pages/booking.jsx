import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchAPI, APIError } from '../services/api';
import { useMutation, useQuery } from '@tanstack/react-query';

const Booking = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setPageTitle } = useOutletContext();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
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

  const {
    data: destination,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['destinasi', slug],
    queryFn: async ({ signal }) => {
      const res = await fetchAPI(`/destinations/${slug}`, { signal });
      return res.data;
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createBookingMutation = useMutation({
    mutationFn: (payload) =>
      fetchAPI('/booking', {
        method: 'POST',
        body: payload,
      }),
    onSuccess: (data) => {
      if (data.success) {
        navigate('/data-booking', {
          state: { message: 'Booking berhasil ditambahkan' },
        });
      }
    },
    onError: (error) => {
      if (error instanceof APIError) {
        if (error.status === 422) {
          setValidationErrors(error.errors || {});
        } else {
          setError('Gagal melakukan reservasi. Silakan coba lagi nanti.');
        }
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
    },
  });

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

    createBookingMutation.mutate(payload);
  };

  return (
    <div className="container py-4">
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-md-8">
          <form onSubmit={handleSubmit} className="card p-4 border-0 shadow-sm">
            <div className="row mb-3">
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="user_name" className="form-label text-muted">
                  Nama Pemesan
                </label>
                <input
                  type="text"
                  id="user_name"
                  className="form-control bg-light"
                  value={currentUser?.name || ''}
                  disabled
                />
              </div>

              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="booking_date" className="form-label fw-medium">
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
            </div>

            <div className="row mb-3">
              <div className="col-sm-12 col-md-6">
                <label className="form-label d-block text-muted">Status</label>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="status"
                    id="status_selesai"
                    checked={formData.status === 'Selesai'}
                    className="form-check-input"
                    value="Selesai"
                    onChange={handleChange}
                  />
                  <label htmlFor="status_selesai" className="form-check-label">
                    Selesai
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => navigate(-1)}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={createBookingMutation.isPending || !destination}
              >
                {createBookingMutation.isPending ? 'Memproses...' : 'Ajukan Reservasi'}
              </button>
            </div>
          </form>
        </div>
        {isLoading ? (
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="placeholder col-12" style={{ height: '180px' }}></div>
              <div className="card-body">
                <h5 className="placeholder col-8 mb-2"></h5>
                <p className="placeholder col-10 mb-3"></p>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <p className="text-danger mb-3">Gagal memuat data destinasi.</p>

                <button type="button" className="btn btn-outline-primary btn-sm" onClick={refetch}>
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img
                src={destination?.image_url || 'https://via.placeholder.com/400x200'}
                alt={destination?.name || 'Destinasi'}
                className="card-img-top object-fit-cover"
                style={{ height: '180px' }}
              />

              <div className="card-body">
                <h5 className="card-title fw-bold">
                  {destination?.name || 'Destinasi Tidak Ditemukan'}

                  {destination?.location && (
                    <span className="badge text-bg-primary ms-2">{destination.location}</span>
                  )}
                </h5>

                <p className="card-text text-muted small mb-3">
                  {destination?.description || 'Deskripsi tidak tersedia'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;

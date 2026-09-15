import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { fetchAPI, APIError } from '../../../services/api';

const TambahDestinasi = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image_url: '',
  });

  const navigate = useNavigate();
  const { setPageTitle } = useOutletContext();
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPageTitle('Tambah Data Destinasi');
  }, [setPageTitle]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    const formDataSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataSubmit.append(key, formData[key]);
      }
    });

    try {
      setIsSubmitting(true);

      const data = await fetchAPI('/admin/destinations', {
        method: 'POST',
        body: formDataSubmit,
      });

      if (data.success) {
        navigate('/admin/data-destinasi', {
          state: { message: data.message },
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof APIError) {
        if (error.status === 422) {
          setValidationErrors(error.errors || {});
        } else if (error.status === 401) {
          setError('Sesi Anda telah berakhir. Silakan login kembali.');
        } else {
          setError('Gagal menambahkan destinasi. Silakan coba lagi nanti.');
        }
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
    }
  };
  return (
    <div>
      <Link to="/admin/data-destinasi" className="btn btn-secondary mb-2">
        Kembali ke Halaman Data Destinasi
      </Link>

      <div className="card p-4">
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="nama" className="form-label">
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="nama"
                className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
              {validationErrors.name && (
                <div className="invalid-feedback">{validationErrors.name[0]}</div>
              )}
            </div>
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="lokasi" className="form-label">
                Lokasi
              </label>
              <input
                type="text"
                name="location"
                id="lokasi"
                className={`form-control ${validationErrors.location ? 'is-invalid' : ''}`}
                value={formData.location}
                onChange={handleChange}
              />
              {validationErrors.location && (
                <div className="invalid-feedback">{validationErrors.location[0]}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Deskripsi
              </label>
              <textarea
                name="description"
                id="deskripsi"
                className={`form-control ${validationErrors.description ? 'is-invalid' : ''}`}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {validationErrors.description && (
                <div className="invalid-feedback">{validationErrors.description[0]}</div>
              )}
            </div>
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="gambar" className="form-label">
                Gambar
              </label>
              <input
                type="file"
                name="image_url"
                id="gambar"
                className={`form-control ${validationErrors.image_url ? 'is-invalid' : ''}`}
                onChange={handleChange}
              />
              {validationErrors.image_url && (
                <div className="invalid-feedback">{validationErrors.image_url[0]}</div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-3" disabled={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Tambah'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahDestinasi;

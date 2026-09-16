import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { fetchAPI, APIError } from '../../../services/api';

const TambahDataUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Tambah Data User');
  }, [setPageTitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      setIsSubmitting(true);
      const data = await fetchAPI('/admin/users', {
        method: 'POST',
        body: payload,
      });

      if (data.success) {
        navigate('/admin/data-user', {
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
          setError('Gagal menambahkan user. Silakan coba lagi nanti.');
        }
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
    }
  };

  return (
    <div>
      <Link to="/admin/data-user" className="btn btn-secondary mb-3">
        Kembali ke Halaman Data User
      </Link>
      <div className="card p-4">
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="nama_lengkap" className="form-label">
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="nama_lengkap"
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <div className="invalid-feedback">{validationErrors.email[0]}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {validationErrors.password && (
                <div className="invalid-feedback">{validationErrors.password[0]}</div>
              )}
            </div>
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label className="form-label">Role</label>
              <select
                name="role"
                className={`form-select ${validationErrors.role ? 'is-invalid' : ''}`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Pilih Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              {validationErrors.role && (
                <div className="invalid-feedback">{validationErrors.role[0]}</div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Tambah'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahDataUser;

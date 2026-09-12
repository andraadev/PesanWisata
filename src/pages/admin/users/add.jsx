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
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setErrors({});

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = await fetchAPI('/admin/users', {
        method: 'POST',
        body: payload,
      });

      if (data.success) {
        alert(data.message);
        navigate('/admin/data-user');
      }
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === 422) {
          setErrors(error.errors || {});
        } else if (error.status === 401) {
          setError('Sesi Anda telah berakhir. Silakan login kembali.');
        } else {
          setError('Gagal menambahkan user. Silakan coba lagi nanti.');
        }
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <a href="/admin/data-user" className="btn btn-secondary mb-3">
        Kembali ke Halaman Data User
      </a>
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
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
            </div>
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
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
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
            </div>
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
              <label className="form-label">Role</label>
              <select
                name="role"
                className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Pilih Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              {errors.role && <div className="invalid-feedback">{errors.role[0]}</div>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Memproses...' : 'Tambah'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahDataUser;

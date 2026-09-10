import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchAPI, APIError } from '../../services/api';

const Register = () => {
  const [formRegister, setFormRegister] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setPageTitle, setPageSubtitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Register');
    setPageSubtitle('Silakan masukkan nama, email, dan password untuk membuat akun baru.');
  }, [setPageTitle, setPageSubtitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setErrors({});

    const payload = {
      name: formRegister.name,
      email: formRegister.email,
      password: formRegister.password,
      confirm_password: formRegister.confirm_password,
    };

    try {
      setLoading(true);
      const data = await fetchAPI('/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (data?.status === 'success' || data?.success) {
        alert('Registrasi berhasil. Untuk saat ini, pengguna belum dapat melakukan login.');
        navigate('/');
      }
    } catch (err) {
      if (err instanceof APIError) {
        if (err.status === 422) {
          setErrors(err.errors || {});
        } else {
          setError(err.message || 'Registrasi Gagal');
        }
      } else {
        setError('Terjadi Masalah Pada Sistem.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-3">
        <div className="row">
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="nama_lengkap" className="form-label">
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="nama_lengkap"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formRegister.name}
              onChange={handleChange}
              autoFocus
            />
            {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formRegister.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Kata Sandi
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formRegister.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
              value={formRegister.confirm_password}
              onChange={handleChange}
            />
            {errors.confirm_password && (
              <div className="invalid-feedback">{errors.confirm_password[0]}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Memproses...' : 'Daftar'}
        </button>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;

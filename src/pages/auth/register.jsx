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

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { setPageTitle, setPageSubtitle } = useOutletContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPageTitle('Register');
    setPageSubtitle('Silakan masukkan nama, email, dan password untuk membuat akun baru.');
  }, [setPageTitle, setPageSubtitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    const payload = {
      name: formRegister.name,
      email: formRegister.email,
      password: formRegister.password,
      confirm_password: formRegister.confirm_password,
    };

    try {
      setIsSubmitting(true);
      const response = await fetchAPI('/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const authData = response?.data;
      if (response?.success) {
        localStorage.setItem('token', authData.token);
        if (authData?.token) {
          localStorage.setItem('token', authData.token);
          if (authData.user) {
            localStorage.setItem('user', JSON.stringify(authData.user));
          }

          navigate('/', {
            state: { message: `Selamat datang, ${authData.user?.name || 'Pengguna'}!` },
          });
        } else {
          navigate('/login', {
            state: { message: response?.message },
          });
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof APIError) {
        if (error.status === 422) {
          setValidationErrors(error.errors || {});
        } else {
          setError('Registrasi gagal, Silakan coba lagi nanti.');
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

      <form onSubmit={handleSubmit} className="card p-3">
        <div className="row">
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="name" className="form-label">
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
              value={formRegister.name}
              onChange={handleChange}
              autoFocus
            />
            {validationErrors.name && (
              <div className="invalid-feedback">{validationErrors.name[0]}</div>
            )}
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
              value={formRegister.email}
              onChange={handleChange}
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email[0]}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
              value={formRegister.password}
              onChange={handleChange}
            />
            {validationErrors.password && (
              <div className="invalid-feedback">{validationErrors.password[0]}</div>
            )}
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              className={`form-control ${validationErrors.confirm_password ? 'is-invalid' : ''}`}
              value={formRegister.confirm_password}
              onChange={handleChange}
            />
            {validationErrors.confirm_password && (
              <div className="invalid-feedback">{validationErrors.confirm_password[0]}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Daftar'}
        </button>
      </form>
    </div>
  );
};

export default Register;

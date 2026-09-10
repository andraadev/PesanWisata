import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchAPI, APIError } from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setPageTitle, setPageSubtitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Login');
    setPageSubtitle('Silakan masukkan email kamu dan password untuk melanjutkan.');
  }, [setPageTitle, setPageSubtitle]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});
    setLoading(true);

    try {
      const response = await fetchAPI('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response?.success) {
        localStorage.setItem('token', response.data.token);
        alert('Login sebagai admin berhasil!');
        navigate('/data-user');
      }
    } catch (err) {
      if (err instanceof APIError) {
        if (err.status === 422) {
          setValidationErrors(err.errors || {});
        } else {
          setError(err.message || 'Login Gagal');
        }
      } else {
        setError('Terjadi Masalah pada Sistem.');
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
      <form onSubmit={handleLogin} className="card p-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {validationErrors.email && (
            <div className="invalid-feedback">{validationErrors.email[0]}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Kata Sandi
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {validationErrors.password && (
            <div className="invalid-feedback">{validationErrors.password[0]}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
        <p className="register-account text-center mt-3">
          Tidak memiliki akun? <Link to="/register">Buat akun baru</Link> untuk memulai.
        </p>
      </form>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchAPI, APIError } from '../../../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const { setPageTitle } = useOutletContext();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    setPageTitle('Edit Data User');
  }, [setPageTitle]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsFetching(true);
        const response = await fetchAPI(`/admin/users/${id}`);

        if (response?.data) {
          setUser({
            name: response.data.name || '',
            email: response.data.email || '',
            role: response.data.role || '',
            password: '',
          });
        }
      } catch (error) {
        console.error('[Fetch User Error]:', error);
        setError('Gagal mengambil data user. Silakan coba lagi nanti');
      } finally {
        setIsFetching(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setErrors({});

    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    if (user.password) {
      payload.password = user.password;
    }

    try {
      setIsSubmitting(true);
      const data = await fetchAPI(`/admin/users/${id}`, {
        method: 'PUT',
        body: payload,
      });

      if (data) {
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
          setError('Gagal mengubah data user. Silakan coba lagi nanti.');
        }
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
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

        {isFetching ? (
          <div className="placeholder-glow">
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="form-label">Nama</label>
                <div
                  className="form-control placeholder col-12 placeholder-wave"
                  style={{ height: '38px' }}
                ></div>
              </div>

              <div className="col-sm-12 col-md-6 mb-3">
                <label className="form-label">Email</label>
                <div
                  className="form-control placeholder col-12 placeholder-wave"
                  style={{ height: '38px' }}
                ></div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="form-label">Password (Opsional)</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  disabled
                />
              </div>

              <div className="col-sm-12 col-md-6 mb-3">
                <label className="form-label">Role</label>
                <div
                  className="form-select placeholder col-12 placeholder-wave"
                  style={{ height: '38px' }}
                ></div>
              </div>
            </div>

            <button className="btn btn-primary disabled placeholder col-2">Simpan</button>
          </div>
        ) : (
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
                  value={user.name}
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
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
              </div>
            </div>
            <div className="row">
              <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  Password (Opsional)
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
              </div>
              <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="">Pilih Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
                {errors.role && <div className="invalid-feedback">{errors.role[0]}</div>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Simpan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUser;

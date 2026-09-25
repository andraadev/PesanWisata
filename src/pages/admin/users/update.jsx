import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchAPI, APIError } from '../../../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setPageTitle } = useOutletContext();

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    setPageTitle('Edit Data User');
  }, [setPageTitle]);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async ({ signal }) => {
      const response = await fetchAPI(`/admin/users/${id}`, { signal });
      return response.data;
    },
  });

  useEffect(() => {
    if (userData) {
      setUser({
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || '',
        password: '',
      });
    }
  }, [userData]);

  const updateMutation = useMutation({
    mutationFn: (payload) =>
      fetchAPI(`/admin/users/${id}`, {
        method: 'PUT',
        body: payload,
      }),

    onSuccess: (data) => {
      navigate('/admin/data-user', {
        state: { message: data.message },
      });
    },

    onError: (error) => {
      if (error instanceof APIError) {
        if (error.status === 422) {
          setValidationErrors(error.errors || {});
        } else {
          setError('Gagal mengubah data user. Silakan coba lagi nanti.');
        }
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    if (user.password) {
      payload.password = user.password;
    }

    updateMutation.mutate(payload);
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

        {isLoading ? (
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
                  className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                  value={user.name}
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
                  value={user.email}
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
                  Password (Opsional)
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                  value={user.password}
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
                  value={user.role}
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

            <button type="submit" className="btn btn-primary" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Memproses...' : 'Simpan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUser;

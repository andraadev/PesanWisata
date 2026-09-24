import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchAPI, APIError } from '../../../services/api';

const EditDataDestinasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { setPageTitle } = useOutletContext();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image_url: null,
  });

  const [oldImage, setOldImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setPageTitle('Edit Data Destinasi');
  }, [setPageTitle]);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setIsFetching(true);
        const response = await fetchAPI(`/admin/destinations/${id}`);
        if (response?.data) {
          setFormData({
            name: response.data.name || '',
            location: response.data.location || '',
            description: response.data.description || '',
            image_url: null,
          });
          setOldImage(response.data.image_url || null);
        }
      } catch (error) {
        setError('Gagal mengambil data destinasi. Silakan coba lagi nanti');
      } finally {
        setIsFetching(false);
      }
    };

    fetchDestination();
  }, [id]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      const selectedFile = files[0];
      setFormData((prev) => ({ ...prev, [name]: selectedFile }));
      if (selectedFile) {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(URL.createObjectURL(selectedFile));
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});
    console.log('Submitted data:', formData);

    const formDataSubmit = new FormData();
    formDataSubmit.append('_method', 'PUT');
    formDataSubmit.append('name', formData.name);
    formDataSubmit.append('location', formData.location);
    formDataSubmit.append('description', formData.description || '');

    if (formData.image_url) {
      formDataSubmit.append('image_url', formData.image_url);
    }

    try {
      setIsSubmitting(true);
      const data = await fetchAPI(`/admin/destinations/${id}`, {
        method: 'POST',
        body: formDataSubmit,
      });

      if (data) {
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
          setError('Gagal mengubah data user. Silakan coba lagi nanti.');
        }
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
    }
  };

  return (
    <div>
      <a href="/admin/data-destinasi" className="btn btn-secondary mb-2">
        Kembali ke Halaman Data Destinasi
      </a>
      <div className="card p-4">
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}
        {isFetching ? (
          <div className="placeholder-glow">
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <div className="placeholder col-4 mb-2"></div>
                <div className="placeholder col-12 py-3 rounded"></div>
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <div className="placeholder col-4 mb-2"></div>
                <div className="placeholder col-12 py-3 rounded"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <div className="placeholder col-4 mb-2"></div>
                <div className="placeholder col-12 py-4 rounded"></div>
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <div className="placeholder col-4 mb-2"></div>
                <div className="placeholder col-12 py-3 rounded"></div>
              </div>
            </div>
            <div className="placeholder col-2 py-3 rounded btn-primary mt-2"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Nama Destinasi
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {validationErrors.name && (
                  <div className="invalid-feedback">{validationErrors.name[0]}</div>
                )}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="location" className="form-label">
                  Lokasi
                </label>
                <input
                  name="location"
                  id="location"
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
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  id="description"
                  className={`form-control ${validationErrors.description ? 'is-invalid' : ''}`}
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                {validationErrors.description && (
                  <div className="invalid-feedback">{validationErrors.description[0]}</div>
                )}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="gambar" className="form-label">
                  Gambar (Opsional)
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
              {(imagePreview || oldImage) && (
                <div className="mb-3">
                  <p className="text-muted d-block mb-1">
                    {imagePreview ? 'Pratinjau Gambar Baru:' : 'Gambar Saat Ini:'}
                  </p>
                  <img
                    src={imagePreview || oldImage}
                    alt="Preview"
                    className="img-thumbnail object-fit-cover"
                    style={{ maxHeight: '120px', maxWidth: '200px' }}
                  />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary mb-3" disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Simpan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditDataDestinasi;

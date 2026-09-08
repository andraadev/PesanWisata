import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../layouts/partials/footer';
import Navbar from '../layouts/partials/navbar';

const Booking = () => {
  const { slug } = useParams(); // Mengambil slug dari URL
  const [users, setUsers] = useState([]); // State untuk menyimpan data user
  const [destination, setDestination] = useState(null); // State untuk menyimpan data destinasi
  const { setPageTitle } = useOutletContext();

  const [formData, setFormData] = useState({
    booking_date: '',
    user_id: '',
    destination_id: '',
    status: 'Selesai',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setPageTitle('Form Reservasi');
  }, [setPageTitle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:8000/api/users');
        if (!usersResponse.ok) {
          throw new Error(`Gagal memuat data user. Silakan coba lagi nanti.`);
        }

        const usersData = await usersResponse.json();
        if (Array.isArray(usersData.data)) {
          if (usersData.data.length === 0) {
            setError('Data user belum tersedia. Silakan coba lagi nanti.');
          } else {
            setUsers(usersData.data);
            console.error('Invalid users response format:', usersData);
          }
        } else {
          setError('Terjadi kesalahan saat memuat data user');
        }

        const destinationResponse = await fetch(`http://localhost:8000/api/destinations/${slug}`);

        if (!destinationResponse.ok) {
          throw new Error(`Gagal memuat data destinasi. Silakan coba lagi nanti.`);
        }

        const destinationData = await destinationResponse.json();
        if (destinationData.data) {
          setDestination(destinationData.data);
        } else {
          setError('Data destinasi belum tersedia. Silakan coba lagi nanti.');
          console.error('Invalid destination response format:', destinationData);
        }
      } catch (err) {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      }
    };

    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('Data yang diinputkan:', formData);

    const formDataSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'user_id' || key === 'destination_id') {
        formDataSubmit.append(key, parseInt(formData[key]) || 0);
      } else {
        formDataSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:8000/api/booking', {
        method: 'POST',
        body: formDataSubmit,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
          // Handle validation errors
          // setError(`Error 422: ${errorData.message || 'Tanggal Booking Wajib Diisi!'}`);
          setValidationErrors(errorData);
        } else if (response.status === 500) {
          // Handle server errors
          setError('Error 500: Terjadi Masalah di Sisi Server');
        } else {
          setError(`HTTP Error | Status ${response.status}: ${response.statusText}`);
        }
        return;
      }

      alert('Booking berhasil ditambahkan');
      navigate('/data-booking');
    } catch (error) {
      setError(`Network Error: ${error.message}`);
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-wrapper card p-4">
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="booking_date" className="form-label">
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
          <div className="col-sm-12 col-md-6">
            <label htmlFor="nama" className="form-label">
              Nama Kamu
            </label>
            <select
              name="user_id"
              // className="form-select"
              className={`form-select ${validationErrors.user_id ? 'is-invalid' : ''}`}
              id="nama"
              value={formData.user_id}
              onChange={handleChange}
            >
              <option value="">Pilih User</option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
            </select>
            {validationErrors.user_id && (
              <div className="invalid-feedback">{validationErrors.user_id[0]}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="destinasi_tujuan" className="form-label">
              Destinasi Tujuan
            </label>
            {destination ? (
              <>
                <input type="text" value={destination.name} className="form-control" disabled />
                <input type="hidden" name="destination_id" value={destination.id} />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="col-sm-12 col-md-6 ">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <br />
            <input
              type="radio"
              name="status"
              id="status"
              checked={formData.status === 'Selesai'}
              className="form-check-input me-2"
              value={formData.status}
              onChange={handleChange}
            />
            <label htmlFor="status">Selesai</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Reservasi
        </button>
      </form>
    </div>
  );
};

export default Booking;

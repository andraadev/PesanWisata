import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Booking = () => {
  const { slug } = useParams(); // Mengambil slug dari URL
  const [users, setUsers] = useState([]); // State untuk menyimpan data user
  const [destination, setDestination] = useState(null); // State untuk menyimpan data destinasi
  const [formData, setFormData] = useState({
    booking_date: '',
    user_id: '',
    destination_id: '',
    status: 'Selesai'
  });
  const [error, setError] = useState(null); // State untuk menyimpan pesan error
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data dari API users
        const usersResponse = await fetch('http://localhost:8000/api/users');
        const usersData = await usersResponse.json();

        // Cek apakah response valid
        if (usersData.status && Array.isArray(usersData.data)) {
          setUsers(usersData.data);
        } else {
          console.error('Invalid users response format:', usersData);
        }

        // Fetch data destinasi berdasarkan slug
        const destinationResponse = await fetch(`http://localhost:8000/api/destinations/${slug}`);
        const destinationData = await destinationResponse.json();

        // Cek apakah response destinasi valid
        if (destinationData.success && destinationData.data) {
          setDestination(destinationData.data); // Simpan data destinasi di state
        } else {
          console.error('Invalid destination response format:', destinationData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      }
    };

    fetchData(); // Panggil fetchData saat komponen di-mount
  }, [slug]); // Mengatur dependensi untuk memuat ulang jika slug berubah

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("Data yang diinputkan:", formData);

    const formDataSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "user_id" || key === "destination_id") {
        formDataSubmit.append(key, parseInt(formData[key]) || 0);
      } else {
        formDataSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:8000/api/booking', {
        method: "POST",
        body: formDataSubmit,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
          // Handle validation errors
          setError(`Error 422: ${errorData.message || 'Tanggal Booking Wajib Diisi!'}`);
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
      <Navbar />
      <main className="container content-wrapper" style={{ minHeight: "80vh" }}>
        <h1 className="text-shadow">Booking</h1>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="form-wrapper card p-4">
          <div className="row mb-3">
            <div className="col-sm-12 col-md-6">
              <label htmlFor="booking_date" className="form-label">Tanggal Booking</label>
              <input type="date" name="booking_date" id="booking_date" className="form-control" value={formData.booking_date} onChange={handleChange} />
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="nama" className="form-label">Nama Kamu</label>
              <select name="user_id" className="form-select" id="nama" value={formData.user_id} onChange={handleChange}>
                <option value="">Pilih User</option>
                {users.length > 0 ? (
                  users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading...</option>
                )}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-6">
              <label htmlFor="destinasi_tujuan" className="form-label">Destinasi Tujuan</label>
              <select name="destination_id" className="form-select" value={formData.destination_id} onChange={handleChange}>
                <option value="">Pilih Destinasi</option>
                {destination ? (
                  <option value={destination.id} key={destination.id}>
                    {destination.name}
                  </option>
                ) : (
                  <option value="">Loading...</option>
                )}
              </select>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="status" className="form-label">Status</label><br />
              <input type="radio" name="status" id="status" checked={formData.status === "Selesai"} className="form-check-input" value={formData.status} onChange={handleChange} />
              <label htmlFor="status">Selesai</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Booking;
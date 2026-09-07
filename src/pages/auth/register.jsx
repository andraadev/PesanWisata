import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    // State untuk menyimpan nilai input form
    const [formRegister, setFormRegister] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    // State untuk menyimpan pesan error per field
    const [errors, setErrors] = useState({});
    
    // State untuk menyimpan error global atau sistem
    const [error, setError] = useState(null);
    
    // Hook untuk navigasi ke halaman lain setelah sukses
    const navigate = useNavigate();

    // Fungsi untuk menangani perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Mengupdate state formRegister sesuai dengan input yang diubah
        setFormRegister({ ...formRegister, [name]: value });
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman
        setError(null); // Reset error global
        setErrors({}); // Reset error per field

        // Membuat objek FormData untuk dikirimkan ke API
        const formRegisSubmit = new FormData();
        Object.keys(formRegister).forEach(key => {
            formRegisSubmit.append(key, formRegister[key]);
        });

        try {
            // Mengirim request ke API untuk registrasi
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                body: formRegisSubmit
            });

            const data = await response.json(); // Mengambil respons dari API

            // Jika registrasi berhasil
            if (response.ok && data.status === 'success') {
                alert('Registrasi berhasil. Untuk saat ini, pengguna belum dapat melakukan login.'); // Menampilkan alert sukses
                navigate('/'); // Navigasi ke halaman utama
            } 
            // Jika ada error validasi dari API (status 422)
            else if (response.status === 422) {
                setErrors(data); // Simpan error per field di state errors
            } 
            // Jika ada error lain
            else {
                setError(data.message || 'Registrasi Gagal'); // Simpan error global
            }
        } catch (error) {
            setError('Terjadi Masalah Pada Sistem.'); // Error jika fetch gagal
        }
    }

    return (
        <div className="container mt-5" style={{ minHeight: "90vh" }}>
            <Link to="/" className="btn btn-secondary">Kembali ke Halaman Utama</Link>
            <h1 className="text-shadow">Register</h1>
            <p className="text-shadow">Silakan masukkan nama, email, dan password untuk membuat akun baru.</p>
            
            {/* Alert Bootstrap untuk menampilkan semua error validasi */}
            {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger" role="alert">
                    <ul>
                        {/* Menampilkan error dari API di dalam list */}
                        {Object.keys(errors).map((key) => (
                            <li key={key}>{errors[key][0]}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Form Registrasi */}
            <form onSubmit={handleSubmit} className="card p-3">
                <div className="row">
                    {/* Input untuk Nama */}
                    <div className="col-sm-12 col-md-6 mb-3">
                        <label for="nama_lengkap" className="form-label">Nama</label>
                        <input type="text" name="name" id="nama_lengkap" className="form-control" value={formRegister.name} onChange={handleChange} autoFocus />
                    </div>
                    {/* Input untuk Email */}
                    <div className="col-sm-12 col-md-6 mb-3">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={formRegister.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    {/* Input untuk Password */}
                    <div className="col-sm-12 col-md-6 mb-3">
                        <label for="password" className="form-label">Kata Sandi</label>
                        <input type="password" name="password" id="password" className="form-control" value={formRegister.password} onChange={handleChange} />
                    </div>
                    {/* Input untuk Konfirmasi Password */}
                    <div className="col-sm-12 col-md-6 mb-3">
                        <label for="confirm_password" className="form-label">Konfirmasi Kata Sandi</label>
                        <input type="password" name="confirm_password" id="confirm_password" className="form-control" value={formRegister.confirm_password} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Daftar</button>
                
                {/* Menampilkan error global (jika ada) */}
                {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Register;

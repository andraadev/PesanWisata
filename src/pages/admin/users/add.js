import React, { useState } from "react";
import NavbarAdmin from "../../../components/navbar_admin";
import Footer from "../../../components/footer";
import { useNavigate } from "react-router-dom";

const TambahDataUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        role: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        console.log(formData);

        const formDataSubmit = new FormData();
        Object.keys(formData).forEach(key => {
            formDataSubmit.append(key, formData[key]);
        });

        try {
            // const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/admin/users', {
                method: "POST",
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // },
                body: formDataSubmit,
            });

            const data = await response.json();

            if (response.ok) {
                // Tampilkan alert sukses
                alert('User Baru berhasil ditambahkan');
                // Redirect ke halaman data user
                navigate('/data-user');
            } else if (response.status === 422) {
                setError(data);
            } else {
                setError(data.message || 'User Baru Gagal Ditambahkan');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <NavbarAdmin />
            <main className="container content-wrapper">
                <a href="/data-user" className="btn btn-secondary">Kembali ke Halaman Data User</a>
                <h1 className="text-shadow">Tambah Data User</h1>
                <p className="text-shadow">Di halaman ini, kamu dapat mendaftarkan user baru.</p>
                <div className="card p-4">
                    {/* Alert Bootstrap untuk menampilkan semua error validasi */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <ul>
                                {/* Menampilkan error dari API di dalam list */}
                                {Object.keys(error).map((key) => (
                                    <li key={key}>{error[key][0]}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                                <label htmlFor="nama_lengkap" className="form-label">Nama</label>
                                <input type="text" name="name" id="nama_lengkap" className="form-control" value={formData.name} onChange={handleChange} autoFocus />
                            </div>
                            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                                <label htmlFor="password" className="form-label">Kata Sandi</label>
                                <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
                            </div>
                            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                                <label htmlFor="confirm_password" className="form-label">Konfirmasi Kata Sandi</label>
                                <input type="password" name="confirm_password" id="confirm_password" className="form-control" value={formData.confirm_password} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                                <option value="">Pilih Role</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Tambah</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TambahDataUser;

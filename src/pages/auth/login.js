import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // panggil api
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                localStorage.setItem('token', data.token);
                alert('Login sebagai admin berhasil!')
                // redirect ke halaman beranda Admin
                navigate('/admin/beranda');
            } else {
                setError(data.message || 'Login Gagal');
            }
        } catch (error) {
            setError('Terjadi Masalah pada Sistem.');
        }
    }
return(
<div class="container mt-5">
<Link to="/" class="btn btn-secondary">Kembali ke Halaman Utama</Link>
    <h1 class="text-shadow">Login</h1>
    <p class="text-shadow">Silakan masukkan email kamu dan password untuk melanjutkan.</p>
    {/* Menampilkan error global (jika ada) */}
    {error && (
        <div class="alert alert-danger mt-3" role="alert">
            {error}
        </div>
    )}
    <form onSubmit={handleLogin} class="card p-3">
        <div id="input-group" class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" name="email" id="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div id="input-group" class="mb-3">
            <label for="password" class="form-label">Kata Sandi</label>
            <input type="password" name="password" id="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit" class="btn btn-primary">Masuk</button>
        <p class="register-account text-center mt-3">
            Tidak memiliki akun? <Link to="/register">Buat akun baru</Link> untuk memulai.
        </p>
    </form>
</div>
);
}
export default Login;
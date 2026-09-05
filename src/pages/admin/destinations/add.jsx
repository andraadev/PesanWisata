import React, { useState } from "react";
import NavbarAdmin from "../../../components/navbar_admin";
import Footer from "../../../components/footer";
import { useNavigate, Link } from "react-router-dom";

const TambahDestinasi = () => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        location: '',
        description: '',
        image_url: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        console.log(formData);

        const formDataSubmit = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image_url' && formData[key]) {
                formDataSubmit.append(key, formData[key]);
            } else {
                formDataSubmit.append(key, formData[key]);
            }
        });

        try {
            // const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/admin/destinations', {
                method: "POST",
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // },
                body: formDataSubmit,
            });

            const data = await response.json();

            if (response.ok) {
                // Tampilkan alert sukses
                alert('Destinasi Baru berhasil ditambahkan');
                // Redirect ke halaman data user
                navigate('/data-destinasi');
            } else if (response.status === 422) {
                setError(data);
            } else {
                setError(data.message || 'Destinasi Baru Gagal Ditambahkan');
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return(
<div>
    <NavbarAdmin/>
    <main class="container content-wrapper">
        <Link to="/data-destinasi" class="btn btn-secondary">Kembali ke Halaman Data Destinasi</Link>
        <h1 class="text-shadow">Tambah Data Destinasi</h1>
        <p class="text-shadow">Di halaman ini, kamu dapat mendaftarkan destinasi wisata baru.</p>
        <div class="card p-4">
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
                <div class="row">
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="nama" class="form-label">Nama</label>
                        <input type="text" name="name" id="nama" class="form-control" value={formData.name} onChange={handleChange} autofocus/>
                    </div>
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="slug" class="form-label">Slug</label>
                        <input type="text" name="slug" id="slug" class="form-control" value={formData.slug} onChange={handleChange}/>
                    </div>
                </div>
                <div class="row">
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="lokasi" class="form-label">Lokasi</label>
                        <input type="text" name="location" id="lokasi" class="form-control" value={formData.location} onChange={handleChange}/>
                    </div>
                    <div id="input-group" class="col-sm-12 col-md-6 mb-3">
                        <label for="deskripsi" class="form-label">Deskripsi</label>
                        <textarea name="description" id="deskripsi" class="form-control" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                </div>
                <div id="input-group" class="mb-3">
                    <label for="gambar" class="form-label">Gambar</label>
                    <input type="file" name="image_url" id="gambar" class="form-control" onChange={handleChange}/>
                </div>
                <button type="submit" class="btn btn-primary mb-3">Submit</button>
            </form>
        </div>
    </main>


    <Footer/>

</div>
    )
}

export default TambahDestinasi;
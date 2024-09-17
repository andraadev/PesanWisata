import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../../components/navbar_admin";
import Footer from "../../../components/footer";
import { useNavigate, useParams } from "react-router-dom";

const EditDataDestinasi = () => {
    const { id } = useParams(); // Mendapatkan ID destinasi dari URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        location: '',
        description: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/admin/destinations/${id}`);
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                if (result && result.data) {
                    console.log("Fetched destination data:", result.data); // Log data untuk debugging
                    setFormData(result.data);
                } else {
                    setError("Data tidak tersedia atau tidak ditemukan.");
                }
            } catch (error) {
                setError("Terjadi kesalahan saat mengambil data: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        console.log("Submitting data:", formData); // Log data yang akan dikirim
        
        const formDataSubmit = new FormData();
    Object.keys(formData).forEach(key => {
            formDataSubmit.append(key, formData[key]);
    });

        try {
            const response = await fetch(`http://localhost:8000/api/admin/destinations/${id}`, {
                method: "PUT",
                body: formDataSubmit,
            });

            const data = await response.json();

            if (response.ok) {
                // Tampilkan alert sukses
                alert('Destinasi Baru berhasil diubah');
                // Redirect ke halaman data user
                navigate('/data-destinasi');
                console.log("Submitted Data:" + formData);
            } else if (response.status === 422) {
                setError(data);
            } else {
                setError(data.message || 'Destinasi Baru Gagal Ditambahkan');
            }
            alert('Data destinasi berhasil diubah');
            navigate('/data-destinasi'); // Redirect ke halaman data destinasi
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return (<p className="text-center mt-5">Sedang mengambil data destinasi berdasarkan ID...</p>);
    if (error) return (<div className="alert alert-danger mt-5" role="alert">Error: {error}</div>);

    return (
        <div>
            <NavbarAdmin />
            <main className="container content-wrapper">
                <a href="/data-destinasi" className="btn btn-secondary">Kembali ke Halaman Data Destinasi</a>
                <h1 className="text-shadow">Edit Data Destinasi</h1>
                <p className="text-shadow">Di halaman ini, kamu dapat mengubah data destinasi.</p>
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
                            <div className="col-sm-12 col-md-6 mb-3">
                                <label htmlFor="name" className="form-label">Nama Destinasi</label>
                                <input type="text" name="name" id="name" className="form-control" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="col-sm-12 col-md-6 mb-3">
                                <label htmlFor="slug" className="form-label">Slug</label>
                                <input type="text" name="slug" id="slug" className="form-control" value={formData.slug} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 mb-3">
                                <label htmlFor="location" className="form-label">Lokasi</label>
                                <input name="location" id="location" className="form-control" value={formData.location} onChange={handleChange} />
                            </div>
                            <div className="col-sm-12 col-md-6 mb-3">
                                <label htmlFor="description" className="form-label">Deskripsi</label>
                                <textarea name="description" id="description" className="form-control" value={formData.description} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mb-3">Ubah Destinasi</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EditDataDestinasi;

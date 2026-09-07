import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../../components/navbar_admin";
import Footer from "../../../components/footer";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
    //   const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
        //   headers: {
        //     // 'Authorization': `Bearer ${token}`
        //   }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched user data:", result); // Log data untuk debugging
        setUser(result.data); // Akses data dari result.data
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate('/data-user');
    } catch (error) {
      setError("Terjadi kesalahan saat memperbarui data: " + error.message);
    }
  };

  if(loading) 
    return (<p className="text-center mt-5">Sedang mengambil data user berdasarkan ID...</p>)
    if(error)
      return (
      <div className="alert alert-danger mt-5" role="alert">
      Error = {error}
      </div>
  )
  return (
    <div>
      <NavbarAdmin />
      <main className="container content-wrapper">
        <h1>Edit User</h1>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="nama_lengkap" className="form-label">Nama</label>
                <input type="text" name="name" id="nama_lengkap" className="form-control" value={user.name} onChange={handleChange} autoFocus />
            </div>                
            <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" id="email" className="form-control" value={user.email} onChange={handleChange} />
            </div>                
            </div>
            <div className="row">
                <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">Kata Sandi</label>
                    <input type="password" name="password" id="password" className="form-control" value={user.password} onChange={handleChange} />
                </div>
                <div id="input-group" className="col-sm-12 col-md-6 mb-3">
                    <label className="form-label">Role</label>
                    <select name="role" className="form-select" value={user.role} onChange={handleChange}>
                    <option value="">Pilih Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    </select>
                </div>
            </div>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default EditUser;

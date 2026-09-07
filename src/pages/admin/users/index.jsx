import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../../components/navbar_admin";
import Footer from "../../../components/footer";

const DataUser = () => {
const [usersData, setUsersData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
    //   const token = localStorage.getItem('token');
      try {
        const response = await fetch("http://localhost:8000/api/admin/users", {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        });
        if (!response.ok) {
          throw new Error(`HTTP error ! Status: ${response.status}`);
        }
        const data = await response.json();
        // Cek log data
        if (Array.isArray(data.data)) {
            setUsersData(data.data);
        } else {
          setError("Data tidak valid atau tidak tersedia");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  if(loading) 
  return (<p className="text-center mt-5">Sedang mengambil data user...</p>)
  if(error)
    return (
    <div className="alert alert-danger mt-5" role="alert">
    Error = {error}
    </div>
)
return(
<div>
    <NavbarAdmin/>
    <main className="container content-wrapper">
        <h1 className="text-shadow">Data User</h1>
        <p className="text-shadow">Di halaman ini, kamu dapat melihat siapa saja yang sudah terdaftar di aplikasi ini.</p>
        <div className="card p-4 table-responsive">
            <Link to="/tambah-user" className="btn btn-primary mb-3">Tambah</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Lengkap</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {usersData.map((user, index) => (
                    <tr key={user.id}>
                    <th scope="row">{index+1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <Link to={`/edit-user/${user.id}`} className="btn btn-warning text-dark">Edit</Link>
                        <a href="#" className="btn btn-danger" onClick={() => handleDelete(user.id)}>Hapus</a>
                    </td>
                </tr>
                ))}

                </tbody>
            </table>
        </div>
    </main>
<Footer/>
</div>
);
// Fungsi untuk menangani penghapusan
async function handleDelete(id) {
    if (window.confirm('Apakah anda yakin? Tindakan ini mungkin memengaruhi data user ini di tabel lain.')) {
    //   const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
          method: 'DELETE',
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        });
        if (!response.ok) {
          throw new Error(`HTTP error ! Status: ${response.status}`);
        }
        // Update state setelah penghapusan
        setUsersData(usersData.filter(user => user.id !== id));
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus data: " + error.message);
      }
    }
  }
}


export default DataUser;
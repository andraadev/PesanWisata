import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../../components/navbar_admin";
import Footer from "../../../components/footer";

const DataDestinasi = () => {
    const [destinationsData, setDestinationsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchDestination = async () => {
        //   const token = localStorage.getItem('token');
          try {
            const response = await fetch("http://localhost:8000/api/admin/destinations", {
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
                setDestinationsData(data.data);
            } else {
              setError("Data tidak valid atau tidak tersedia");
            }
          } catch (error) {
            setError("Terjadi kesalahan saat mengambil data: " + error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchDestination();
      }, []);
      if(loading) 
      return (<p className="text-center mt-5">Sedang mengambil data destinasi...</p>)
      if(error)
        return (
        <div className="alert alert-danger mt-5" role="alert">
        Error = {error}
        </div>
    )
    return(
        <div>
    <NavbarAdmin />
    <main className="container content-wrapper">
        <h1 className="text-shadow">Data Destinasi</h1>
        <p className="text-shadow">Di halaman ini, kamu dapat melihat destinasi wisata yang sudah terdaftar.</p>
        <div className="card p-4 table-responsive">
            <Link to="/tambah-destinasi" className="btn btn-primary mb-3">Tambah</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Lokasi</th>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">Gambar</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {destinationsData.map((destination, index) => (
                    <tr key={destination.id}>
                        <th scope="row">{index+1}</th>
                        <td>{destination.name}</td>
                        <td>{destination.slug}</td>
                        <td>{destination.location}</td>
                        <td>{destination.description}</td>
                        <td>-</td>
                        <td>
                            <Link to={`/edit-destinasi/${destination.id}`} className="btn btn-warning text-dark">Edit</Link>
                            <a href="#" className="btn btn-danger" onClick={() => handleDelete(destination.id)}>Hapus</a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </main>
<Footer/>
</div>
)
async function handleDelete(id) {
    if (window.confirm('Apakah anda yakin? Tindakan ini mungkin memengaruhi data destinasi ini di tabel lain.')) {
    //   const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8000/api/admin/destinations/${id}`, {
          method: 'DELETE',
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        });
        if (!response.ok) {
          throw new Error(`HTTP error ! Status: ${response.status}`);
        }
        alert('Hapus Data Destinasi Berhasil!');
        // Update state setelah penghapusan
        setDestinationsData(destinationsData.filter(destination => destination.id !== id));
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus data: " + error.message);
      }
    }
  }
}

export default DataDestinasi;

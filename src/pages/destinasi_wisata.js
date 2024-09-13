import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const DestinasiWisata = () =>{
        const [destinasiData, setDestinasiData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        useEffect(()=> {
            const fetchDestinasi = async () => {
                // const token = localStorage.getItem('token');
                try {
                const response = await fetch ('http://localhost:8000/api/destinations', {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
                
                    });
                    if(!response.ok){
                        throw new error(`HTTP error ! Status:
                            ${response.status}`);
                    }
                    const data = await response.json();
                    //cek log data
                    if(Array.isArray(data.data)){
                        setDestinasiData(data.data);
                    } else {
                        setError("Data sedang error");
                    }
                } catch(error){
                    setError(error.message);
                } finally{
                    setLoading(false);
                }
            };
            fetchDestinasi();
        }, []);
    return (
        <div>
    <Navbar />
    <main class="container content-wrapper">
        <h1 class="text-shadow">Destinasi Wisata yang Tersedia</h1>
        <p class="text-shadow">Silakan pilih destinasi yang kamu inginkan.</p>
        <section class="destination-cards-wrapper container-fluid row grid gap-5">
        {destinasiData.map(destinasi =>(
            <div class="card col-4 col-sm-12 p-0" style={{ width: '18rem' }}>
                <img src="assets/images/pura-tanah-lot-tempel-am-meer-istock-494560541.jpg" class="card-img-top"
                    alt="pura tanah lot"/>
                <div class="card-body">
                    <h5 class="card-title">
                        {destinasi.name}
                        <span class="badge text-bg-primary">Bali</span>
                    </h5>
                    <p class="card-text description">
                        {destinasi.description}
                    </p>
                    <Link to={`/booking/${destinasi.slug}`} class="btn btn-primary w-100">Pilih</Link>
            </div>
            </div>
        ))};
        </section>
    </main>

    <Footer />
        </div>
    );
}

export default DestinasiWisata;
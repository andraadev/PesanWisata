import React, {useState, useEffect} from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const DataBooking = () => {
   const [bookingData, setBookingData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   useEffect(()=> {
       const fetchBooking = async () => {
           // const token = localStorage.getItem('token');
           try {
           const response = await fetch ('http://localhost:8000/api/booking', {
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
                   setBookingData(data.data);
               } else {
                   setError("Data bukan array!");
               }
           } catch(error){
               setError(error.message);
           } finally{
               setLoading(false);
           }
       };
       fetchBooking();
   }, []);
   return(
<div>
<Navbar />
   <main class="container content-wrapper" style={{minHeight: '80vh'}}>
      <h1 class="text-shadow">Data Booking</h1>
      <p class="text-shadow">Di halaman ini, kamu dapat melihat destinasi mana saja yang pernah kamu booking.</p>
      <div class="card p-4 table-responsive">
         <table class="table">
            <thead>
               <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Destinasi</th>
                  <th scope="col">Tanggal Booking</th>
               </tr>
            </thead>
            <tbody>
               {bookingData.map((booking, no) => (
                  <tr key={booking.id}>
                  <th scope="row">{no + 1}</th>
                  <td>{booking.name}</td>
                  <td>{booking.destination}</td>
                  <td>{booking.booking_date}</td>
               </tr>
               ))}
            </tbody>
         </table>
      </div>
   </main>
  <Footer />
</div>
);
}
export default DataBooking;
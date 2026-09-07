import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <body className="no-scrollbar">
      <Navbar />
      <section className="jumbotron container">
        <h1 className="jumbotron-header text-shadow">PesanWisata</h1>
        <p className="jumbotron-content text-shadow">
          Temukan dan pesan tiket ke berbagai destinasi wisata favorit dengan cepat, mudah, dan
          praktis dalam satu tempat.
        </p>
        <Link
          to="/destinasi"
          className="cta-btn btn btn-lg bg-white text-dark rounded-pill"
          role="button"
        >
          Lihat Destinasi
        </Link>
      </section>
      <Footer />
    </body>
  );
};

export default Home;

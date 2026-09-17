import { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const { setPageTitle } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    setPageTitle('Beranda');
  }, [setPageTitle]);

  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <>
      {toastMessage && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div
            className="toast show align-items-center text-white bg-success border-0"
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body">{toastMessage}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToastMessage(null)}
              ></button>
            </div>
          </div>
        </div>
      )}
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
    </>
  );
};

export default Home;

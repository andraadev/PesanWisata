import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const BerandaAdmin = () => {
  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle('Beranda');
  }, [setPageTitle]);

  return (
    <div className="no-scrollbar">
      <section className="jumbotron container">
        <h1 className="jumbotron-header text-shadow">Beranda</h1>
        <p className="jumbotron-content text-shadow">Selamat datang, Admin!</p>
      </section>
    </div>
  );
};
export default BerandaAdmin;

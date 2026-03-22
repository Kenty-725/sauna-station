import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="border-bottom shadow-sm bg-white">
      <div className="container py-3">
        <div className="d-flex align-items-center">
          <Link to="/" className="fs-4 fw-bold text-decoration-none" style={{ color: '#c5571c' }}>
            Sauna Station
          </Link>
        </div>
      </div>
    </header>
  );
};

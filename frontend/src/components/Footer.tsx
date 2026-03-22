export const Footer = () => {
  return (
    <footer className="mt-auto border-top" style={{ backgroundColor: '#f3f4f6' }}>
      <div className="container py-4">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-column gap-1">
            <a
              href="#"
              className="text-secondary text-decoration-none small"
              onClick={(e) => e.preventDefault()}
              aria-disabled="true"
              style={{ pointerEvents: 'none', opacity: 0.6 }}
            >
              施設担当者ログイン
            </a>
            <a
              href="#"
              className="text-secondary text-decoration-none small"
              onClick={(e) => e.preventDefault()}
              aria-disabled="true"
              style={{ pointerEvents: 'none', opacity: 0.6 }}
            >
              管理者ログイン
            </a>
          </div>
          <p className="mb-1 text-secondary small">© 2026 Sauna Station</p>
        </div>
      </div>
    </footer>
  );
};

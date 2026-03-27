type ErrorAlertProps = {
  message: string;
};

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  const messages = message
    .split(/[\n,、]/)
    .map((m) => m.trim())
    .filter(Boolean);

  return (
    <div className="alert alert-danger py-2 mb-0">
      <ul className="mb-0 ps-3">
        {messages.map((m, idx) => (
          <li key={idx}>{m}</li>
        ))}
      </ul>
    </div>
  );
};

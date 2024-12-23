const Loading = () => {
  return (
    <main className="main">
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </main>
  );
};

export default Loading;

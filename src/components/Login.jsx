export default function Login() {
  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Masukkan username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Masukkan password"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-login">
            Login
          </button>
          <div className="text-center mt-3">
            <a href="#" className="text-muted">
              Lupa password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

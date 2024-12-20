import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const { login, tokens } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(`username: ${username}, password: ${password}`);
    // setError('');
    // setIsLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        // Redirect ke halaman dashboard
        Navigate('/');
      } else {
        console.log(success);
        // setIsLoading(false);
        Swal.fire({
          title: 'Error!',
          text: 'Username / password salah',
          icon: 'error',
          confirmButtonText: 'Ok',
        });

        // setError('Login gagal. Periksa kembali kredensial Anda.');
      }
    } catch (err) {
      console.log('Terjadi kesalahan saat login', err);
    }
  };
  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

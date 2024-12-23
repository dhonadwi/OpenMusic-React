import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import Loading from './Loading';
import Swal from 'sweetalert2';

const LoginOpenMusic = () => {
  const { login, tokens } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(`username: ${username}, password: ${password}`);
    // setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        // Redirect ke halaman dashboard
        Navigate('/');
      } else {
        console.log(success);
        setIsLoading(false);
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
  if (isLoading) return <Loading />;
  return (
    <div className="login-open-music">
      {/* <div className="music-notes" style={{ top: '10%', left: '10%' }}>
        ♪
      </div>
      <div className="music-notes" style={{ top: '20%', right: '20%' }}>
        ♫
      </div>
      <div className="music-notes" style={{ bottom: '15%', left: '20%' }}>
        ♩
      </div>
      <div className="music-notes" style={{ bottom: '25%', right: '15%' }}>
        ♬
      </div> */}

      <div className="container">
        <div className="login-card mx-auto">
          <div className="text-center mb-4">
            <i className="fas fa-music music-icon"></i>
            <h2 className="mb-3">Open Music</h2>
            <p className="text-muted">
              Sign in to access your music collection
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text border-0 bg-transparent">
                  <i className="fas fa-user text-muted"></i>
                </span>
                <input
                  id="username"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text border-0 bg-transparent">
                  <i className="fas fa-lock text-muted"></i>
                </span>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4 d-flex justify-content-between align-items-center">
              {/* <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-decoration-none">
                Forgot password?
              </a> */}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-login w-100 mb-4"
            >
              Sign In <i className="fas fa-play ms-2"></i>
            </button>

            <div className="text-center">
              <span className="text-muted">Don't have an account?</span>
              <a href="#" className="text-decoration-none ms-1">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginOpenMusic;

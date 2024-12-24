import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

const Profile = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [fullname, setFullname] = useState(user.fullname);
  const [password, setPassword] = useState('');
  const { logout, authenticatedFetch } = useAuth();

  const changePassword = async () => {
    const dataBody = {
      password,
      email
    };
    try {
      const response = await authenticatedFetch(
        `${import.meta.env.VITE_BASEURL}/users`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataBody),
        }
      );
      const data = await response.json();
      console.log('data', data);
      return true;
      //  const dataUser = data.data.user;
      //  setUser(dataUser);
    } catch (error) {
      console.log('terjadi kesalahan saat mendapatkan data user', error);
      return false;
    }
  };

  const handleSubmit = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change Password!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await changePassword();
        console.log('res', result);
        await Swal.fire({
          title: 'Password updated!',
          text: 'Please check your email',
          icon: 'success',
        });
        logout();
      }
    });
  };
  return (
    <main className="main mt-5">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="login-card ">
                <form>
                  <h4>Profile</h4>
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
                        value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-transparent">
                        <i className="bi bi-person-vcard text-muted"></i>
                      </span>
                      <input
                        id="fullname"
                        type="text"
                        className="form-control"
                        placeholder="Enter your fullname"
                        value={fullname}
                        // onChange={(e) => setFullname(e.target.value)}
                        disabled
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
                        placeholder="Enter to change your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleSubmit()}
                  >
                    Change password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;

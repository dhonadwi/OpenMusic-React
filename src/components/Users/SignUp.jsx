import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      props.onHide();
    }
    const options = {
      username: email,
      fullname,
    };
    const data = await fetch(`${import.meta.env.VITE_BASEURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
    const result = await data.json();
    console.log(result);
    Swal.fire({
      title: 'Success',
      text: 'Please check your email',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setEmail('');
    setFullname('');
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            type="email"
            required
            placeholder="Enter your email"
          />
          <input
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="form-control"
            type="text"
            required
            placeholder="Enter your fullname"
          /> */}
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
                onChange={(e) => setEmail(e.target.value)}
                required
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
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={props.onHide}
          >
            Close{' '}
          </button>
          {/* <Button onClick={props.onHide}>Close</Button> */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default SignUp;

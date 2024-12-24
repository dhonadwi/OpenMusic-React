import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
export default function ForgotPassword(props) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      props.onHide();
    }
    const options = {
      email,
    };
    const data = await fetch(`${import.meta.env.VITE_BASEURL}/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
    const result = await data.json();
    console.log(result.status);
    Swal.fire({
      title: 'Success',
      text: 'Please check your email',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    setEmail('');
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('haha');
  // };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Forgot Password
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            type="email"
            required
            placeholder="Enter your email"
          />
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
}

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
// <Button variant="primary" onClick={() => setModalShow(true)}>
//   Launch vertically centered modal
// </Button>

// <MyVerticallyCenteredModal
//   show={modalShow}
//   onHide={() => setModalShow(false)}
// />
//     </>
//   );
// }

// render(<App />);

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Untuk melakukan request ke backend

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mengirim request login ke backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      

      // Jika login berhasil, arahkan pengguna berdasarkan level
      if (response.data.success) {
        const { level } = response.data;

        // Arahkan pengguna berdasarkan level
        if (level === 1) {
          navigate('/admin');
        } else if (level === 2) {
          navigate('/asesor');
        } else if (level === 3) {
          navigate('/asesi');
        }
      }
    } catch (error) {
      // Jika ada error, tampilkan pesan kesalahan
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Menampilkan pesan error */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

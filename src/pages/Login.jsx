import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#F5F5F5',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    color: '#666',
    marginBottom: '6px',
    fontWeight: '500',
  }

  const handleSubmit = (e) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be at least 8 characters and contain uppercase, lowercase, and a number"
    );
    return;
  }

  console.log({ email, password });
  axios.post('https://staging-api.gatherly.io/api/auth/login', { email, password })
    .then((response) => {
      console.log(response.data);
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
      );
        navigate('/dashboard')

    })

    
    .catch((error) => {
      console.error(error);
      toast.error("Login Failed. Please check your credentials and try again.");
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '40px 36px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>

        <div style={{ marginBottom: '20px' }}>
          <Logo page="auth" />
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#5C0013', marginBottom: '6px' }}>
          Organizer Login
        </h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '28px', lineHeight: '1.5' }}>
          Enter your details to manage your events and check in attendees
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Wealth@gmail.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wealth1010"
              style={inputStyle}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '16px',
            background: '#800020',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '4px',
          }}>
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#888' }}>
          Not yet an Organizer?{' '}
          <Link to="/signup" style={{ color: '#5C0013', fontWeight: '700', textDecoration: 'underline' }}>
            Become an Organizer
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

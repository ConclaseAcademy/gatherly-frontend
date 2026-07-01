import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { FiEye, FiEyeOff } from "react-icons/fi";
import useLoaderStore from "../store/useLoaderStore";
import useAuthStore from "../store/authStore";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoaderStore();
  const { setAuth, loadUser } = useAuthStore();
  const API_BASE_URL = 'http://20.25.50.191:5144';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    try {
          showLoader();

      const response = await axios.post(`${API_BASE_URL}/api/Auth/login`, {
        identifier: email.trim(),
        password,
      });

      const payload = response.data?.data || response.data;
      const token = payload?.accessToken || payload?.token || payload?.jwt;
      const role = payload?.user?.role || payload?.role || response?.data?.data?.user?.role;
      if (role) {
        localStorage.setItem('role', role);
      }

      if (token) {
        localStorage.setItem('token', token);
      }

      if (payload?.refreshToken) {
        localStorage.setItem('refreshToken', payload.refreshToken);
      }

      setAuth(payload?.user || null, token);
      await loadUser();

      toast.success('Login Successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error(
        'Login error:',
        error.response?.status,
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.errors?.[0] ||
        'Login failed. Please check your credentials and try again.'
      );
    }
    finally {
  hideLoader();
}
  };
  

  const hidePws = () => {

    setShowPassword(showPassword==true?false:true);
  }
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
          Welcome Back!
        </h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '28px', lineHeight: '1.5' }}>
           Login to your accout to continue
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
            <div style={{display:"flex", alignItems:'center', gap:"10px", position: 'relative'}}>
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wealth1010"
              style={inputStyle}
            />
            {showPassword ? (
                <FiEye 
             style={{
              position: 'absolute',
             right: '20px',
              fontSize: '22px',
              color:'#9ca3af',
              cursor: 'pointer',
               }}
                
                onClick={() => setShowPassword(false)}
                 />
               ) : (
               <FiEyeOff
              style={{
                position: 'absolute',
               right: '20px',
               fontSize: '22px',
                 color:'#9ca3af',
                 cursor: 'pointer',
              }}
             onClick={() => setShowPassword(true)}
            />
        )}
             
            </div>
          </div>
          <div
              style={{
              display: "flex",
               justifyContent: "flex-end",
              marginTop: "10px",
             }}
>
                <Link to="/forgot-password" style={{ color: '#5C0013', fontWeight: '500', textDecoration: 'underline' }}>Forgot Password?</Link>
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

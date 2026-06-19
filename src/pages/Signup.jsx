import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false);

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
      toast.error("Please enter a valid email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and contain uppercase, lowercase, and a number"
      );
      return;
    }

     
    const data = {
      fullName: name,
      phone: contact,
      email: email,
      password: password,
      role: "Organizer",
    }


     axios.post('https://staging-api.gatherly.io/api/auth/register', data).then((response) => {
      toast.success('Signup Successful!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

      });
       navigate('/login');
    }).catch((error) => {
      console.error(error);
      toast.error("Signup Failed. Please try again.");
    });
   
 
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
          <Logo  page="auth"/>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#5C0013', marginBottom: '6px' }}>
          Become an Organizer
        </h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '28px', lineHeight: '1.5' }}>
          Enter your details to create an account with us
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={labelStyle}>Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Wealth Happiness"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="09134671010"
              style={inputStyle}
            />
          </div>

          {/* role: Attendee or Organizer using radio */}
          {/* <div>
            <label style={labelStyle}>Role</label>
            <div style={{display:"flex", alignItems:'center', gap:"20px"}}>
              <label style={{display:"flex", alignItems:'center', gap:"6px"}}>
                <input type="radio" name="role" value="organizer" defaultChecked />
                Organizer
              </label>
              <label style={{display:"flex", alignItems:'center', gap:"6px"}}>
                <input type="radio" name="role" value="attendee" />
                Attendee
              </label>
            </div>
            
          </div> */}

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
            <div style={{display:"flex", alignItems:'center', gap:"10px"}}>
               <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wealth1010"
              style={inputStyle}
            />
            <button onClick={()=>hidePws()} type="button" style={{
             
            backgroundColor: 'gray',
              border: 'none',
              cursor: 'pointer',
                color: 'white',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
            }}>
              {showPassword ? "Hide" : "Show"}
            </button>
           </div>
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
            Create Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#888' }}>
          Already an Organizer?{' '}
          <Link to="/login" style={{ color: '#5C0013', fontWeight: '700', textDecoration: 'underline' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup

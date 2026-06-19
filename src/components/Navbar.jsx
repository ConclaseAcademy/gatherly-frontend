import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Gather<span style={{ color: '#E57591' }}>ly</span>
      </h2> */}
     <Logo/>

      <div className="nav-btns">
        <button className="organizer" onClick={() => navigate('/signup')}>
          Become an Organizer →
        </button>

        <button className="login" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
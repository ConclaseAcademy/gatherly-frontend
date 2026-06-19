import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { BsCalendarDateFill } from "react-icons/bs";
import { PiCirclesFour } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";





const NavbarTwo = ({ onCreateClick }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-two">
      <div className="logo-wrap">
        <Logo page="auth" />
      </div>

      <div className="nav-links">
        <Link to="/events" className="nav-link">
          <span className="nav-link-icon"><BsCalendarDateFill /></span>
          Browse Events
        </Link>
        <Link to="/dashboard" className="nav-link nav-link-pill">
        <span className="nav-link-icon"><PiCirclesFour /></span>
          My Events
        </Link>
        <button className="logout-btn" onClick={() => navigate("/login")}>
          <span className="nav-link-icon"><FiLogOut /></span>
          Logout
        </button>
      </div>
      <button className="organizer-create-btn" onClick={onCreateClick}>
        <span style={{ color: '#FCB8C9' }}>+</span> Create Events
      </button>
    </nav>
  );
};

export default NavbarTwo;
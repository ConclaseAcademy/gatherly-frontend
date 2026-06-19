import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoTicketOutline } from "react-icons/io5";

const Features = () => {
  return (
    <section className="features">

      <h2>
        Everything you need to
        <br />
        host amazing events
      </h2>
      <p>Powerful features designed to make event management a breeze</p>

      <div className="feature-grid">

        <div className="feature-card">
          <span style={{ backgroundColor: "#A52A2A", padding:"10px", marginBlockStart:"-20px", borderRadius:"30%", display:"inline-block", color:"#fff", marginBottom:"12px" }}>
<LuCalendarDays />
          </span>
          <h3>Easy Event Creation</h3>
          <p>
            Create and customize events in minutes.
          </p>
        </div>

        <div className="feature-card">
          <span style={{ backgroundColor:"#800080", padding:"10px", marginBlockStart:"-20px", borderRadius:"30%", display:"inline-block", color:"#fff", marginBottom:"12px" }}>
        <HiOutlineUsers />
          </span>

          <h3>RSVP Management</h3>
          <p>
            Track attendees and manage capacity.
          </p>
        </div>

        <div className="feature-card">
          <span style={{ backgroundColor: "#0000FF", padding:"10px", marginBlockStart:"-20px", borderRadius:"30%", display:"inline-block", color:"#fff", marginBottom:"12px" }}>
        <IoTicketOutline />
          </span>

          <h3>Digital Tickets</h3>
          <p>
            Generate unique tickets instantly.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Features;
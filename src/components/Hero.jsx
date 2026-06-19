import EventCard from "./EventCard";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section className="hero">

      <span className="tagline">
        The simplest way to manage events 🤝
      </span>

      <h1>
        Create Memorable Events,
        <br />
        Manage <span>RSVPs</span> Effortlessly
      </h1>

      <p>
        From intimate workshops to large conferences, EventHub makes it easy to create events,<br></br>
        manage attendees, and generate digital tickets—all in one beautiful platform.
      
      </p>

      <div className="hero-btns">
        <Link to="/signup"><button>Create Account</button></Link>
        <Link to="/events">
          <button className="secondary">
            See Events
          </button>
        </Link>
      </div>

      <div className="events-grid">
        <EventCard
          image="https://images.unsplash.com/photo-1511578314322-379afb476865"
          title="Community Meetup"
          attendees="369"
        />

        <EventCard
          image="https://images.unsplash.com/photo-1543269865-cbf427effbad"
          title="Design Workshop 2026"
          attendees="369"
        />

        <EventCard
          image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          title="Cohort 20 Graduation"
          attendees="369"
        />
      </div>

    </section>
  );
};

export default Hero;
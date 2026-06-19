import { Link } from 'react-router-dom'

const WhyChooseUs = () => {
  return (
    <section className="why-us">

      <div className="left">

        <h2>
          Why organizers
          <br />
          love us
        </h2>

        <ul>
          <li>Free to create and manage events</li>
          <li>Responsive design</li>
          <li>Search attendees easily</li>
          <li>Instant ticket generation</li>
          <li>Real-time attendance tracking</li>
        </ul>

        <Link to="/signup">
          <button className="primary-btn">Start Creating Events</button>
        </Link>

      </div>

      <div className="right">
        <div className="mockup">
          <div className="bar"></div>
          <div className="line"></div>
          <div className="line short"></div>

          <div className="boxes">
            <div></div>
            <div></div>
          </div>

          <div className="footer-bar"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
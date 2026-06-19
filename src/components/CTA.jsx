import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className="cta">

      <h2>
        Ready to <span>create</span> your
        <br />
        first event?
      </h2>

      <p>
        Join event organizers who trust us.
      </p>

      <Link to="/signup">
        <button className="secondary-btn">Get Started Now →</button>
      </Link>

    </section>
  );
};

export default CTA;
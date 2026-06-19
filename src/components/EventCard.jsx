const EventCard = ({ image, title, attendees }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} />

      <div className="event-card-content">
        <small>Conference</small>

        <h4>{title}</h4>

        <p>👥 {attendees}/600</p>
      </div>
    </div>
  );
};

export default EventCard;
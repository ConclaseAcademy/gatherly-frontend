import { PiShareNetworkLight } from "react-icons/pi";


const ShareEventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null

  const eventLink = event
  ? `http://localhost:5173/events/${event.id}`
  : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventLink)
      alert('Link copied!')
    } catch {
      alert('Unable to copy link automatically.')
    }
  }

  const handleShare = async () => {
  if (navigator.share) {
    await navigator.share({
      title: event?.title,
      text: `Join me at ${event?.title}`,
      url: eventLink, 
    });
  } else {
    navigator.clipboard.writeText(eventLink);
    alert("Link copied!");
  }
};

  return (
    <div className="modal-overlay">
      <div className="share-modal">
        <button className="close-btn" onClick={onClose} type="button">×</button>

        <h1>Share Event</h1>

        <p className="subtitle">
          Share this event link with friends and family so they can RSVP directly.
        </p>

        <div className="event-preview">
          <h3>{event?.title}</h3>
          
            <p>{event?.description}</p>

          <small>{event?.date} • {event?.venue}</small>
        </div>

        <label>Event Link</label>
        <div className="link-box">
          <input type="text" value={eventLink} readOnly />
          <button type="button" onClick={copyLink}>Copy</button>
        </div>

        <label>Share Message</label>
        <div className="message-box">
          <h3>Check out this event: {event?.title}</h3>
          <p>📅 {event?.date} {event?.startTime && `at ${event.startTime}`}</p>
          <p>📍 {event?.venue}</p>
          <p>RSVP here: <span style={{color: '#4C0114'}}> {eventLink}</span></p>
        </div>

        <button onClick={handleShare} className="share-btn" type="button"><PiShareNetworkLight />

            Share via</button>
      </div>
    </div>
  )
}

export default ShareEventModal

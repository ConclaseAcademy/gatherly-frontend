import { PiShareNetworkLight } from "react-icons/pi";


const ShareEventModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const eventLink = 'https://your-event-link.com'

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
      title: "Freshers Football Match",
      text: "Check out this event!",
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
          <h3>Freshers Football Match</h3>
          <p>
            An upcoming match with Lasu year 1 students. Register to be part of the amazing team.
          </p>
          <small>Wednesday, May 17, 2026 • Lasu Football Pitch, Lagos</small>
        </div>

        <label>Event Link</label>
        <div className="link-box">
          <input type="text" value={eventLink} readOnly />
          <button type="button" onClick={copyLink}>Copy</button>
        </div>

        <label>Share Message</label>
        <div className="message-box">
          <h3>Check out this event: Freshers Football Match</h3>
          <p>📅 Wednesday, May 17, 2026 at 04:15 PM</p>
          <p>📍 Lasu Football Pitch, Lagos</p>
          <p>RSVP here: <span style={{color: '#4C0114'}}> {eventLink}</span></p>
        </div>

        <button onClick={handleShare} className="share-btn" type="button"><PiShareNetworkLight />

            Share via</button>
      </div>
    </div>
  )
}

export default ShareEventModal

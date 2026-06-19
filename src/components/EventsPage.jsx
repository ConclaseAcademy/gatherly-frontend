import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import CTA from './CTA';
import Footer from './Footer';
import { BsCalendarDateFill } from 'react-icons/bs';
import { IoTicketOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { CiLocationOn } from 'react-icons/ci';
import RSVPModal from './RSVPModal';
import axios from 'axios';
import { toast } from 'react-toastify';



const events = [

  {
    id: 1,
    category: "Sport",
    title: "City Marathon",
    date: "June 20, 2026",
    time: "9:00 AM",
    location: "Central Park",
    attendees: 120,
    price: "Free",
    spots: "24 spots left",
  },
  {
    id: 2,
    category: "Workshop",
    title: "React Fundamentals",
    date: "June 25, 2026",
    time: "1:00 PM",
    location: "Tech Hub",
    attendees: 45,
    price: "25",
    spots: "12 spots left",
  },
  {
    id: 3,
    category: "Conference",
    title: "Web Design Summit",
    date: "July 2, 2026",
    time: "10:00 AM",
    location: "Downtown Center",
    attendees: 250,
    price: "99",
    spots: "32 spots left",
  },
];

const EventsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState([]);
  const openRSVP = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  useEffect(() => {
      axios.get('https://staging-api.gatherly.io/api/events')
        .then((response) => {
          console.log('Events data:', response.data);
          setEventData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
          toast.error("Failed to load events. Please try again later.");
        });
  }, []);

  return (
    <>
      <Navbar />

      <section className="events-list-page">
        <h1>Discover & Create Events</h1>

        <div className="search-filter">
          <input type="text"  placeholder="Search Events..."/>

          <select>
            <option>All</option>
            <option>Sport</option>
            <option>Workshop</option>
            <option>Conference</option>
          </select> 
          <p>{events.length} Events Found</p>
        </div>

        <div className="events-list-grid">
          {events.map((event) => (
            <div className="event-item" key={event.id}>
              <div className="event-item-banner">
                <span style={{backgroundColor: '#FFD3DE', color: '#8D8A8A'}}>{event.category}</span>
              </div>

              <div className="event-item-content">
                <h3>{event.title}</h3>

                <p>
                  <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                    <BsCalendarDateFill />
                 </span>
                   {event.date} • {event.time}
                </p>

                <p>
                  <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                     <CiLocationOn />
                  </span>
                   {event.location}</p>

                <p> 
                  <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                   <HiOutlineUsers />
                  </span>
                  {event.attendees} Attendees</p>

                <p>
                  <span style={{ backgroundColor: "white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}><IoTicketOutline /></span>
                   {event.price}</p>

                <div className="event-item-footer">
                  <button className="spots-btn">{event.spots}</button>
                  <button className="rsvp-btn" onClick={() => openRSVP(event)}>RSVP →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      <RSVPModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        event={selectedEvent}
      />

      <CTA />

      <Footer />
    </>
  );
};

export default EventsPage;
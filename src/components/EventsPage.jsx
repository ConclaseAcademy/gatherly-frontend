import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import CTA from './CTA';
import Footer from './Footer';
import { BsCalendarDateFill } from 'react-icons/bs';
import { IoTicketOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { CiLocationOn } from 'react-icons/ci';
import RSVPModal from '../components/RSVPModal';
import TicketModal from '../components/TicketModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getEvents } from '../api/Api'


const EventsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketOpen, setTicketOpen] = useState(false);
const [capacity, setCapacity] = useState(null);
  

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

    const [eventData, setEventData] = useState([]);
     useEffect(()=>{
     getEvents().then((response)=>{
      setEventData(response.data.data.items)
      console.log(response.data.data.items)
     }).catch((error)=>{
      toast.error(error.data.messgae || "unable to load your event")
      console.log(error)
     })
     },[])

  const openRSVP = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

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
          <p>{eventData.length} Events Found</p>
        </div>

        <div className="events-list-grid">

          {eventData.map((event) => (
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
                   {event.date} • {event.startTime}
                </p>

                <p>
                  <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                     <CiLocationOn />
                  </span>
                   {event.venue}</p>

                <p> 
                  <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                   <HiOutlineUsers />
                  </span>
                  {event.capacity} Attendees</p>

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

      <TicketModal
  isOpen={ticketOpen}
  onClose={() => setTicketOpen(false)}
  event={selectedEvent}
  attendee={capacity}
/>

      <CTA />

      <Footer />
    </>
  );
};

export default EventsPage;
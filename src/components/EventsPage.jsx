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
import useLoaderStore from '../store/useLoaderStore';


const EventsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [capacity, setCapacity] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const { showLoader, hideLoader } = useLoaderStore();
  
  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

     const [category, setCategory] = useState("All")
     const [search, setSearch] = useState("")
    const [eventData, setEventData] = useState([]);
     useEffect(() => {
  showLoader();
  getEvents()
    .then((response) => {
      const activeEvents = response.data.data.items.filter(
        (event) => event.status !== "Cancelled"
      );
     
      setEventData(activeEvents);
    })
    .catch((error) => {
      toast.error(
        error.response?.data?.message || "Unable to load events"
      );
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });
}, []);

    const filteredEvents = eventData.filter((event) => {
  const matchesSearch = event.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || event.category === category;

  return matchesSearch && matchesCategory;
});

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
          <input type="text" 
          placeholder="Search Events..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)} />

          

          <select
           value={category}
          onChange={(e) => setCategory(e.target.value)}
           >
       <option value="All">All</option>
       <option value="Conference">Conference</option>
       <option value="Meetup">Meetup</option>
      <option value="Workshop">Workshop</option>
      <option value="Concert">Concert</option>
      <option value="Graduation">Graduation</option>
      <option value="Sports">Sports</option>
       <option value="Others">Others</option>
      </select>
          <p>{eventData.length} Events Found</p>
        </div>

        <div className="events-list-grid">

          {filteredEvents.map((event) => (
            <div className="event-item" key={event.eventId}>
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
                  <button className="spots-btn">
                  {event.capacity === event.registeredCount? "Sold Out"
                  : `${event.capacity - event.registeredCount} Slots Left`}
                </button>
                 {/* <button className="spots-btn">Slot {event.capacity - event.registeredCount}</button> */}
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
          onSuccess={({ event, attendee }) => {
         console.log("Ticket received:", attendee);

        setSelectedEvent(event);
        setTicketData(attendee);
       setTicketOpen(true);

       loadEvents();
       }}
      />
      

      <TicketModal
  isOpen={ticketOpen}
  onClose={() => setTicketOpen(false)}
  event={selectedEvent}
  attendee={ticketData}
/>

      <CTA />

      <Footer />
    </>
  );
};

export default EventsPage;
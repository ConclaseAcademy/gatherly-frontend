import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import { IoTicketOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import { BsCalendarDateFill } from "react-icons/bs";
import NavbarTwo from '../components/NavbarTwo';
import CreateEventModal from '../components/CreateEventModal';
import CheckInModal from '../components/CheckInModal';
import ShareEventModal from '../components/ShareEventModal';
import TicketModal from '../components/TicketModal';
import { getMyEvents } from '../api/Api';
import { deleteEvent } from '../api/registrationApi';
import { toast } from 'react-toastify';
import useEventStore from '../store/eventStore';
import useAuthStore from "../store/authStore";









const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
   
    const [openMenuId, setOpenMenuId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [checkInEvent, setCheckInEvent] = useState(null);
    const [showshareEventModal, setShowShareEventModal] = useState(false)
    const [shareEvent, setShareEvent] = useState(null)
   const [ticketOpen, setTicketOpen] = useState(false);
    const [ticketEvent, setTicketEvent] = useState(null);
    const [attendee, setAttendee] = useState(null);
   const role= localStorage.getItem("role")


     const { user } = useAuthStore();
    

     //const [eventData, setEventData] = useState([]);

    const { events, loadEvents, deleteEventFromStore } = useEventStore();

    //  useEffect(()=>{
    //  getMyEvents().then((response)=>{
    //   setEventData(response?.data?.data?.items)
    //   console.log(response)
    //  }).catch((error)=>{
    //   toast.error(error.data.messgae || "unable to load your event")
    //   console.log(error)
    //  })
    //  },[])

    useEffect(() => {
  loadEvents();
}, []);

     const handleDeleteEvent = async (eventId) => {
  try {
    await deleteEventFromStore(eventId);

    toast.success("Event deleted successfully.");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete event.");
  }

  setOpenMenuId(null);
};
  

    return(
        <>
        <NavbarTwo onCreateClick={() => { setEditingEvent(null); setModalOpen(true); }} />
        <CreateEventModal
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditingEvent(null); }}
          eventToEdit={editingEvent}
          
        />
        <CheckInModal isOpen={!!checkInEvent} onClose={() => setCheckInEvent(null)} eventTitle={checkInEvent?.title} />
        <TicketModal isOpen={ticketOpen} onClose={() => setTicketOpen(false)} event={ticketEvent} attendee={attendee} />
        <ShareEventModal
          isOpen={showshareEventModal}
          onClose={() => setShowShareEventModal(false)}
          event={shareEvent}
        />
        <section className="dashboard-page">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
              <h2>Welcome, {user?.fullName}</h2>
             
               <div>
                 <h1>My Events Dashboard</h1>
                <p>
                 {
                  role=="Organizer"?"Manage your events and check-in attendees" :"You have not register for any event yet"
                 }
                 </p>
               </div>
               
             </div>
              <div className="dashboard-grid"> {events.map((event) => ( 
                <div className="dashboard-card" key={event.eventId}> 
                <div className="card-banner"> 
                    <button
                      className="menu-btn"
                      aria-label="Open event menu"
                      onClick={() => setOpenMenuId(openMenuId === event.eventId ? null : event.eventId)}
                    >⋮</button>
                    {openMenuId === event.eventId && (
                      <div className="dropdown-menu">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingEvent(event)
                            setModalOpen(true)
                            setOpenMenuId(null)
                          }}
                        >
                          Edit Event
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShareEvent(event)
                            setShowShareEventModal(true)
                            setOpenMenuId(null)
                          }}
                        >
                          Share Event
                        </button>

                        
                       
                      </div>
                    )}

                    <span  style={{backgroundColor: '#FFD3DE', color: '#8D8A8A', right: '15px', bottom: '15px', padding: '5px 12px', fontSize: '12px', borderRadius: '20px', position: 'absolute'}}>{event.category}</span>
                </div> 
                <div className="card-content"> 
                    <h3>{event.title}</h3> 
                    <p style={{color: '#8D8A8A'}}>{event.description}</p>
                     
                    <p> <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                            <BsCalendarDateFill />
                             </span> {event.date} &nbsp; {event.startTime}</p> 
                    <p> <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                            <CiLocationOn />
                             </span> {event.venue}</p>
                    <p> <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                            <HiOutlineUsers />
                             </span> {event.capacity} Attendees</p> 
                    <p> <span style={{ backgroundColor: "white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}><IoTicketOutline /></span>
                    {event.price}</p> 
                <div className="dashboard-actions"> 
                    <button className="checkin-btn" onClick={() => setCheckInEvent(event)}> Check-In Attendee </button>
                    <button className="delete-btn" onClick={() => handleDeleteEvent(event.eventId)}> Delete Event </button>
                 </div>
                  </div> 
                  </div> 
                ))} 
                </div> 
                 
                <CreateEventModal
  isOpen={modalOpen}
  onClose={() => {
    setModalOpen(false);
    setEditingEvent(null);
  }}
  eventToEdit={editingEvent}
  onSubmit={() => {
    getMyEvents()
      .then((response) => {
        setEventData(response.data.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }}
/>

                <ShareEventModal
                   isOpen={showshareEventModal}
                    onClose={() => setShowShareEventModal(false)}
                      event={shareEvent}
                  />
                </section> 
                <Footer />

        </>
        
    );
};

export default Dashboard;
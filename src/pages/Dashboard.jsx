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






const initialEvents = [
{
id: 1,
category: "sport",
title: "Freshers Football Match",
description:
"An upcoming match with Lasu year 1 students. Register to be part of the amazing team.",
date: "Wed, Jun 17 2026",
time: "04:15 PM",
location: "Lasu Football Pitch, Lagos",
attendees: "01/150",
price: "Free",
},
];


const Dashboard = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [events, setEvents] = useState(initialEvents);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [checkInEvent, setCheckInEvent] = useState(null);
    const [showshareEventModal, setShowShareEventModal] = useState(false)
    const [shareEvent, setShareEvent] = useState(null)
    const [ticketOpen, setTicketOpen] = useState(false);
    const [ticketEvent, setTicketEvent] = useState(null);
    const [attendee, setAttendee] = useState(null);

    const handleSaveEvent = (updatedEvent) => {
      setEvents((prev) =>
        prev.some((item) => item.id === updatedEvent.id)
          ? prev.map((item) => (item.id === updatedEvent.id ? { ...item, ...updatedEvent } : item))
          : [updatedEvent, ...prev]
      );
      setEditingEvent(null);
    };

    const handleDeleteEvent = (eventId) => {
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      setOpenMenuId(null);
    };

    useEffect(() => {
      if (location.state?.showTicketModal) {
        setTicketOpen(true);
        setTicketEvent(location.state.ticketEvent || null);
        setAttendee(location.state.attendee || null);
        navigate(location.pathname, { replace: true, state: {} });
      }
    }, [location, navigate]);

    return(
        <>
        <NavbarTwo onCreateClick={() => { setEditingEvent(null); setModalOpen(true); }} />
        <CreateEventModal
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditingEvent(null); }}
          eventToEdit={editingEvent}
          onSubmit={handleSaveEvent}
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
               <div>
                 <h1>My Events Dashboard</h1>
                 <p>Manage your events and check-in attendees</p>
               </div>
               
             </div>
              <div className="dashboard-grid"> {events.map((event) => ( 
                <div className="dashboard-card" key={event.id}> 
                <div className="card-banner"> 
                    <button
                      className="menu-btn"
                      aria-label="Open event menu"
                      onClick={() => setOpenMenuId(openMenuId === event.id ? null : event.id)}
                    >⋮</button>
                    {openMenuId === event.id && (
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
                             </span> {event.date} &nbsp; {event.time}</p> 
                    <p> <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                            <CiLocationOn />
                             </span> {event.location}</p>
                    <p> <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                            <HiOutlineUsers />
                             </span> {event.attendees} Attendees</p> 
                    <p> <span style={{ backgroundColor: "white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}><IoTicketOutline /></span>
                    {event.price}</p> 
                <div className="dashboard-actions"> 
                    <button className="checkin-btn" onClick={() => setCheckInEvent(event)}> Check-In Attendee </button>
                    <button className="delete-btn" onClick={() => handleDeleteEvent(event.id)}> Delete Event </button>
                 </div>
                  </div> 
                  </div> 
                ))} 
                </div> 
                </section> 
                <Footer />

        </>
        
    );
};

export default Dashboard;
import React from "react";
import { BsCalendarDateFill } from 'react-icons/bs';
import { IoTicketOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

const TicketModal = ({ isOpen, onClose, event, attendee }) => {
  if (!isOpen) return null;

  const ticketCode = `TKT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const handleDownload = () => {
    const content = [
      "Event Ticket",
      `Event: ${event?.title || "Your Event"}`,
      `Date: ${event?.date || "TBD"}`,
      `Time: ${event?.time || "TBD"}`,
      `Location: ${event?.location || "TBD"}`,
      `Attendee: ${attendee?.name || "Guest"}`,
      `Email: ${attendee?.email || ""}`,
      `Ticket Code: ${ticketCode}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(event?.title || "event").toLowerCase().replace(/\s+/g, "-")}-ticket.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: 'blur(6px)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '470px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'linear-gradient(180deg, #ffffff 0%, #fffafc 100%)',
          borderRadius: '22px',
          padding: '22px',
          boxShadow: '0 18px 50px rgba(0, 0, 0, 0.22)',
          border: '1px solid #ffe3ec',
          position: 'relative',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            right: "16px",
            top: "16px",
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer",
            color: "#999",
          }}
        >
          ✕
        </button>

        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            color: "#222",
          }}
        >
          {event?.title || "Community Yoga in the Park"}
        </h3>

        <span
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "4px 10px",
            borderRadius: "12px",
            background: "#f6edf2",
            color: "#a57a8f",
            fontSize: "11px",
          }}
        >
          {event?.category || "Sport"}
        </span>

        <div
          style={{
            marginTop: "14px",
            height: "120px",
            borderRadius: "10px",
            background:
              "linear-gradient(90deg, #f8e5eb 0%, #f6b7c8 100%)",
          }}
        />


        <p
          style={{
            marginTop: "12px",
            color: "#777",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {event?.description || "Free outdoor yoga session for all levels. Bring your mat and enjoy 3 hours of mindfulness"}
        </p>

        <div
          style={{
            background: "#fafafa",
            borderRadius: "12px",
            padding: "15px",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#999",
                  marginBottom: "6px",
                }}
              >
                <span style={{ backgroundColor:"white", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                <BsCalendarDateFill />
              </span>
                 Date & Time
              </div>
              <div style={{ fontWeight: 600, fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px' }}>
                {event?.date || "Wednesday, May 13, 2026"}
              </div>
              <div style={{ fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px' }}>{event?.time || "06:30 AM"}</div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#999",
                  marginBottom: "6px",
                }}
              >
                <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
               <CiLocationOn />
               </span>
                 Location
              </div>
              <div style={{ fontWeight: 600, fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px' }}>
                {event?.location || "Ikeja Recreational Center"}
              </div>
              <div style={{ fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px' }}>
                Lagos, Nigeria
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#999",
                  marginBottom: "6px",
                }}
              >
                <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
               <HiOutlineUsers />
            </span> 
                 Capacity
              </div>
              <div style={{ fontWeight: 600, fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px' }}>
                {event?.attendees ? `${event.attendees} Registered` : "39/100 Registered"}
              </div>
              <div style={{ fontSize: "13px", color: "#666", lineHeight: '23px', marginLeft: '15px' }}>
                {event?.spots || "61 spots left"}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#999",
                  marginBottom: "6px",
                }}
              >
                <span style={{ backgroundColor: "", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}><IoTicketOutline /></span>
                Price
              </div>
              <div style={{ fontWeight: 600, fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px' }}>{event?.price || "0.00"}</div>
              <div style={{ fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px'}}>{event?.price === "Free" || event?.price === "0.00" ? "It's Free" : "Paid entry"}</div>
            </div>
          </div>
        </div>


        <div
          style={{
            marginTop: "14px",
            border: "1px solid #f1f1f1",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#999",
              marginBottom: "10px",
            }}
          >
            Organizer
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 600 }}>
              <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                <FaRegUser />
               </span>
              {event?.organizerName || "Wealth"}
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" , display: "inline-flex", alignItems: "center"}}>
               <CiMail />
            </span> 
              {event?.organizerEmail || "Wealth@gmail.com"}
            </div>
          </div>
        </div>

        
        <div
          style={{
            marginTop: "16px",
            background: "#eefcf2",
            border: "1px solid #d8f3df",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          <div
            style={{
              color: "#22a35a",
              fontWeight: 600,
              fontSize: "13px",
              marginBottom: "12px",
            }}
          >
            <span style={{ backgroundColor: "", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#22a35a", marginBottom:"6px" }}><IoTicketOutline /></span> You are registered for this event!
          </div>

          <div
            style={{
              background: "#DAFFEA",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ color: "#777", fontSize: "11px", lineHeight: '23px', }}>Attendee</div>
                <div style={{ fontWeight: 600, fontSize: "13px", lineHeight: '23px', }}>
                  {attendee?.name || "Wealth Happiness"}
                </div>
              </div>

              <div>
                <div style={{ color: "#777", fontSize: "11px", lineHeight: '23px', }}>
                  Email Address
                </div>
                <div style={{ fontWeight: 600, fontSize: "13px", lineHeight: '23px', }}>
                  {attendee?.email || "Wealth@gmail.com"}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "12px" }}>
              <div style={{ color: "#777", fontSize: "11px", lineHeight: '23px',  }}>
                Event Ticket
              </div>
              <div style={{ fontWeight: 700, fontSize: "13px", lineHeight: '23px',  }}>
                {ticketCode}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            style={{
              width: "100%",
              marginTop: "12px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ⬇ Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
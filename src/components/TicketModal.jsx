import React from "react";
import { BsCalendarDateFill } from 'react-icons/bs';
import { formatDisplayTime } from '../utils/formatTime';
import { IoTicketOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

const TicketModal = ({ isOpen, onClose, event, attendee }) => {
  if (!isOpen) return null;

  // const ticketCode = `TKT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  
  const ticketCode = attendee?.accessCode;
  
  const handleDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Ticket - ${event?.title || "Event"}</title>
  <style>
    body { margin: 0; padding: 0; background: #f8f2f6; font-family: Inter, system-ui, sans-serif; }
    .ticket-wrapper { width: 100%; max-width: 860px; margin: 0 auto; padding: 20px; box-sizing: border-box; }
    .ticket { background: #fff; border-radius: 28px; border: 1px solid #f4d7e2; box-shadow: 0 24px 76px rgba(0,0,0,0.08); overflow: hidden; }
    .ticket-top { padding: 34px 40px 28px; background: linear-gradient(135deg, #fff1f6 0%, #ffe4ef 100%); }
    .ticket-title { margin: 0 0 8px; font-size: 34px; font-weight: 800; color: #2f0d20; }
    .ticket-tag { display: inline-flex; align-items: center; padding: 12px 18px; border-radius: 999px; background: #ffe5ef; color: #bf2c62; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
    .ticket-header { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; }
    .ticket-detail-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 26px; }
    .detail-card { padding: 18px 20px; border-radius: 22px; background: #fff; border: 1px solid #f7d8e5; }
    .detail-card h4 { margin: 0 0 8px; font-size: 11px; color: #9e7a8f; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 800; }
    .detail-card p { margin: 0; font-size: 16px; color: #32131f; line-height: 1.5; font-weight: 700; }
    .ticket-body { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 24px 40px 30px; }
    .ticket-info { border-radius: 24px; padding: 24px; background: #fff6f9; border: 1px solid #f7d8e5; }
    .ticket-info h4 { margin: 0 0 10px; font-size: 12px; color: #9e7a8f; text-transform: uppercase; letter-spacing: 0.12em; }
    .ticket-info p { margin: 0; font-size: 16px; color: #32131f; font-weight: 700; line-height: 1.5; }
    .ticket-code { padding: 24px; border-radius: 24px; background: #fff0f7; border: 1px dashed #f5c2d1; font-size: 22px; font-weight: 800; letter-spacing: 0.14em; text-align: center; color: #8d2452; }
    .ticket-footer { padding: 22px 40px 34px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 14px; background: #fffefc; }
    .footer-text { font-size: 13px; color: #7f5d6b; }
    @media(max-width: 780px) {
      .ticket-header, .ticket-body, .ticket-footer { display: block; }
      .ticket-detail-grid { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>
  <div class="ticket-wrapper">
    <div class="ticket">
      <div class="ticket-top">
        <div class="ticket-header">
          <div>
            <p class="ticket-tag">Ticket</p>
            <h1 class="ticket-title">${event?.title || "Event"}</h1>
          </div>
          <div class="ticket-code">${ticketCode || "N/A"}</div>
        </div>
        <div class="ticket-detail-grid">
          <div class="detail-card"><h4>Date</h4><p>${event?.date || "TBD"}</p></div>
          <div class="detail-card"><h4>Time</h4><p>${formatDisplayTime(event?.startTime) || "TBD"}</p></div>
          <div class="detail-card"><h4>Location</h4><p>${event?.venue || "TBD"}</p></div>
          <div class="detail-card"><h4>Attendee</h4><p>${attendee?.name || "Guest"}</p></div>
        </div>
      </div>
      <div class="ticket-body">
        <div class="ticket-info">
          <h4>Price</h4>
          <p>${event?.price || "Free"}</p>
        </div>
        <div class="ticket-info">
          <h4>Email</h4>
          <p>${attendee?.email || "guest@example.com"}</p>
        </div>
      </div>
      <div class="ticket-footer">
        <div class="footer-text">Please present this ticket at the event entrance.</div>
        <div class="footer-text">Generated on ${new Date().toLocaleDateString()}</div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(event?.title || 'event').toLowerCase().replace(/\s+/g, '-')}-ticket.html`;
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
             
              <div style={{ fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px' }}>{event?.date} • {formatDisplayTime(event?.startTime)}</div>
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
              
              
              <div style={{ fontSize: "13px", color: '#666', lineHeight: '23px', marginLeft: '15px' }}>
                {event.venue}
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
                {event?.registeredCount}/{event?.capacity} Registered
              </div>
              <div style={{ fontSize: "13px", color: "#666", lineHeight: '23px', marginLeft: '15px' }}>
                {event.capacity - event.registeredCount} Spots Left
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
                Wealth  {/* {attendee?.name || "Wealth Happiness"} */}
                </div>
              </div>

              <div>
                <div style={{ color: "#777", fontSize: "11px", lineHeight: '23px', }}>
                  Email Address
                </div>
                <div style={{ fontWeight: 600, fontSize: "13px", lineHeight: '23px', }}>
                Wealth@gmail.com  {/* {attendee?.email || "Wealth@gmail.com"} */}
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

          <div style={{ display: 'grid', gap: '12px' }}>
            <button
              type="button"
              onClick={handleDownload}
              style={{
                width: "100%",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ⬇ Download Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
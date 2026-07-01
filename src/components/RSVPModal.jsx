import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCalendarDateFill } from 'react-icons/bs';
import { formatDisplayTime } from '../utils/formatTime';
import { IoTicketOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { registerForEvent } from "../api/registrationApi";
import useLoaderStore from '../store/useLoaderStore';


function RSVPModal({ isOpen, onClose, event, onSuccess, }) {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
   const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const { showLoader, hideLoader } = useLoaderStore();

  if (!isOpen) return null;

 


const handleRSVP = async () => {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) {
    alert("Please enter your full name.");
    return;
  }

  if (!trimmedEmail) {
    alert("Please enter your email address.");
    return;
  }

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(trimmedEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  showLoader();
  try {
    const response = await registerForEvent(
      event.eventId,
      trimmedName,
      trimmedEmail
    );

    console.log("Registration Response:", response);

    setSubmitted(true);

    console.log("onSuccess prop:", onSuccess);

    onSuccess({
      event,
      attendee: {
        name: trimmedName,
        email: trimmedEmail,
        accessCode: response.data.accessCode,
        registrationId: response.data.registrationId,
        ticketType: response.data.ticketType,
        status: response.data.status,
      },
    });

    onClose();
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Registration failed");
  } finally {
    hideLoader();
  }
};
 

  

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <>
      <div
        onClick={handleClose}
        style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.62)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '18px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
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
          onClick={handleClose}
          style={{
            position: 'absolute',
            right: '12px',
            top: '12px',
            border: 'none',
            background: '#fff5f8',
            width: '34px',
            height: '34px',
            borderRadius: '999px',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#8d506b',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 4px 10px rgba(180, 90, 130, 0.12)',
          }}
          
        >
          ✕
        </button>

        

        <h3
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 600,
            color: '#0E0D0D',
            lineHeight: '29px',
          }}
        >
          {event?.title || 'Community Yoga in the Park'}
        </h3>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginTop: '10px',
            padding: '6px 16px',
            borderRadius: '20px',
            backgroundColor: '#FFECF1',
            color: '#8D8A8A',
            fontSize: '13px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            border: '1px solid #ffd4e2',
          }}
        >
          {event?.category || 'Sports'}
        </span>

        
        <div
          style={{
            height: '126px',
            marginTop: '16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #fff5f8 0%, #ffdfe9 45%, #ffc8d9 100%)',
            border: '1px solid #ffd8e4',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        />

        <p
          style={{
            fontSize: '16px',
            color: '#5c6470',
            lineHeight: '23px',
            marginTop: '12px',
            fontWeight: '400px'
          }}
        >
          {event?.title}
        </p>

        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginTop: '18px',
            fontSize: '13px',
          }}
        >
          <div style={{ background: '#fff7fa', border: '1px solid #ffe2eb', borderRadius: '12px', padding: '10px' }}>
            <div style={{ color: '#8D8A8A', marginBottom: '4px', fontSize: '12px', fontWeight: 700 }}>
              <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                <BsCalendarDateFill />
              </span>
             Date & Time
            </div>
            <div style={{ color: '#666', lineHeight: '23px', marginLeft: '15px' }}>{event.date} &nbsp; {formatDisplayTime(event.startTime)}</div>
          </div>

          <div style={{ background: '#fff7fa', border: '1px solid #ffe2eb', borderRadius: '12px', padding: '10px' }}>
            <div style={{ color: '#8D8A8A', marginBottom: '4px', fontSize: '12px', fontWeight: 700 }}>
             <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
               <CiLocationOn />
               </span>      
             Location
            </div>
           
            <div style={{ color: '#666', lineHeight: '23px', marginLeft: '15px'}}>{event.venue}</div>
          </div>

          <div style={{ background: '#fff7fa', border: '1px solid #ffe2eb', borderRadius: '12px', padding: '10px' }}>
            <div style={{ color: '#8D8A8A', marginBottom: '4px', fontSize: '12px', fontWeight: 700 }}>
             <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
               <HiOutlineUsers />
            </span> 
               Capacity
            </div>
            <div style={{ fontWeight: 500, color: '#222', fontSize: '16px', lineHeight: '23px', marginLeft: '15px'}}>
              {event?.capacity || 0} Registered
            </div>
            <div style={{ color: '#666',  lineHeight: '23px', marginLeft: '15px'}}>
              {event?.registeredCount || 'Spots left'}</div>
          </div>

          <div style={{ background: '#fff7fa', border: '1px solid #ffe2eb', borderRadius: '12px', padding: '10px' }}>
            <div style={{ color: '#8D8A8A', marginBottom: '4px', fontSize: '12px', fontWeight: 700 }}>
            <span style={{ backgroundColor: "", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}><IoTicketOutline /></span>
             Price
            </div>
            <div style={{ fontWeight: 500, color: '#222', fontSize: '16px', lineHeight: '23px', marginLeft: '15px' }}>{event?.price || 'Free'}</div>
            <div style={{ color: '#666', lineHeight: '23px', marginLeft: '15px' }}>{event?.price === 'Free' ? 'No charge' : 'Paid entry'}</div>
          </div>
        </div>

        <div
          style={{
            marginTop: '18px',
            background: 'linear-gradient(135deg, #fff8fb 0%, #fff2f6 100%)',
            borderRadius: '14px',
            padding: '12px',
            border: '1px solid #ffe2eb',
            boxShadow: '0 6px 16px rgba(186, 119, 147, 0.08)',
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#8D8A8A",
              fontWeight: "500px",
              marginBottom: "10px",
              lineHeight: "19px",
            }}
          >
            Organizer
          </div>

          <div
            style={{
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" }}>
                <FaRegUser />
               </span>
             {/* {event?.organizerName} */} Wealth
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#666",
              lineHeight: "23px",
              marginTop: "4px",
              
              
            }}
          >
            <span style={{ backgroundColor:"", padding:"6px", marginBlockStart:"-20px", borderRadius:"10%", display:"inline-block", color:"#E57591", marginBottom:"6px" , display: "inline-flex", alignItems: "center"}}>
               <CiMail />
            </span> 
             {/* {event?.organizerEmail} */} Wealth@gmail.com
          </div>
        </div>

        <div style={{ marginTop: '18px' }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: '#555', fontWeight: 700 }}>
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Wealth Happiness"
            required
            style={{ width: '100%', padding: '12px', border: '1px solid #e5d6de', borderRadius: '10px', marginBottom: '12px', outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', boxSizing: 'border-box' }}
            
            
          />

          <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: '#555', fontWeight: 700 }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="wealth@gmail.com"
            required
            style={{ width: '100%', padding: '12px', border: '1px solid #e5d6de', borderRadius: '10px', marginBottom: '12px', outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', boxSizing: 'border-box' }}
          />

          <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: '#555', fontWeight: 700 }}>
            Phone Number
          </label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="+234 903 639 3969"
            required
            style={{ width: '100%', padding: '12px', border: '1px solid #e5d6de', borderRadius: '10px', outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', boxSizing: 'border-box' }}
            
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '13px',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#800020',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 10px 18px rgba(163, 0, 56, 0.25)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
          
              onClick={handleRSVP}
            >
              {submitted ? 'RSVP Sent ✓' : 'Confirm RSVP →'}
            </button>

            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: '13px 18px',
                borderRadius: '10px',
                border: '1px solid #f3bfd0',
                background: '#FCB8C9',
                color: '#4C0114',
                fontSize: '20px',
                fontWeight: '600px',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, background 0.15s ease',
              }}
              
            >
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>

    </>
  );
}

export default RSVPModal;

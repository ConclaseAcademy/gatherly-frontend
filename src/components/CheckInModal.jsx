import { useState } from 'react'
import { checkInAttendee } from "../api/registrationApi";
import { toast } from "react-toastify";



function CheckInModal({ isOpen, onClose, eventTitle, eventId }) {
   const [registrationId, setRegistrationId] = useState("");

  const handleCheckIn = async () => {
  try {
    await checkInAttendee(eventId, registrationId);

    toast.success("Attendee checked in successfully!");

    setRegistrationId("");

    onClose();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Check-in failed"
    );
  }
};
 
  const handleClose = () => {
   setRegistrationId("");
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          borderRadius: '20px',
          padding: '36px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: 'none',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          fontFamily: 'Poppins, sans-serif',
          background: '#fff',
        }}
      >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0E0D0D' }}>
          Check-In:{' '}
          <span style={{ color: '#aaa', fontWeight: '700' }}>{eventTitle}</span>
        </h2>
        <button
          onClick={handleClose}
          style={{ background: 'none', border: 'none', fontSize: '20px', color: '#999', cursor: 'pointer', paddingTop: '4px' }}
        >
          ×
        </button>
      </div>

      <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px', lineHeight: '1.6' }}>
        Scan or enter ticket number or email address to check-in attendees
      </p>

      {/* Board */}
      <p style={{ fontSize: '12px', color: '#555', fontWeight: '500', marginBottom: '8px' }}>Board</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        background: '#F5F5F5',
        borderRadius: '12px',
        padding: '20px 0',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        <div>
          <p style={{ fontSize: '36px', fontWeight: '700', color: '#0E0D0D', margin: 0 }}>0</p>
          <p style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>Checked-In</p>
        </div>
        <div style={{ background: '#E57591', width: '1px' }} />
        <div>
          <p style={{ fontSize: '36px', fontWeight: '700', color: '#0E0D0D', margin: 0 }}>0</p>
          <p style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>Left</p>
        </div>
      </div>

      {/* Search */}
      <p style={{ fontSize: '12px', color: '#555', fontWeight: '500', marginBottom: '8px' }}>
        Ticket number or Email Address
      </p>
      <input
        value={registrationId}
        onChange={e => setRegistrationId(e.target.value)}
        placeholder="Enter Registration ID"
        style={{
          width: '100%',
          padding: '13px 16px',
          background: '#F5F5F5',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#333',
          outline: 'none',
          marginBottom: '24px',
          fontFamily: 'Poppins, sans-serif',
        }}
      />

      <button
  onClick={handleCheckIn}
  style={{
    width: "100%",
    background: "#800020",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    marginTop: "20px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "Poppins, sans-serif",
  }}
>
  Check In Attendee
</button>
        
      
    </div>
  </div>
  )
}

export default CheckInModal

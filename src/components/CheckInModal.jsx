import { useState } from 'react'

const initialAttendees = [
  { id: 1, name: 'Wealth Happiness', ticket: 'TKT-1669502136936-9YTFCC', checkedIn: false },
  { id: 2, name: 'Wealth Happiness', ticket: 'TKT-1669502136937-4XKPBB', checkedIn: false },
  { id: 3, name: 'Wealth Happiness', ticket: 'TKT-1669502136938-2MNQAA', checkedIn: false },
]

function CheckInModal({ isOpen, onClose, eventTitle }) {
  const [attendees, setAttendees] = useState(initialAttendees)
  const [search, setSearch] = useState('')

  const checkedInCount = attendees.filter(a => a.checkedIn).length
  const leftCount = attendees.length - checkedInCount

  const filtered = attendees.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.ticket.toLowerCase().includes(search.toLowerCase())
  )

  const handleCheckIn = (id) => {
    setAttendees(prev => prev.map(a => a.id === id ? { ...a, checkedIn: true } : a))
  }

  const handleClose = () => {
    setAttendees(initialAttendees)
    setSearch('')
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
          <p style={{ fontSize: '36px', fontWeight: '700', color: '#0E0D0D', margin: 0 }}>{checkedInCount}</p>
          <p style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>Checked-In</p>
        </div>
        <div style={{ background: '#E57591', width: '1px' }} />
        <div>
          <p style={{ fontSize: '36px', fontWeight: '700', color: '#0E0D0D', margin: 0 }}>{leftCount}</p>
          <p style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>Left</p>
        </div>
      </div>

      {/* Search */}
      <p style={{ fontSize: '12px', color: '#555', fontWeight: '500', marginBottom: '8px' }}>
        Ticket number or Email Address
      </p>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Wealth@gmail.com"
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

      {/* Attendees List */}
      <p style={{ fontSize: '14px', fontWeight: '700', color: '#0E0D0D', marginBottom: '12px' }}>
        All Attendees ({attendees.length})
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(attendee => (
          <div
            key={attendee.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#FFF0F4',
              borderRadius: '10px',
              padding: '14px 16px',
            }}
          >
            <div>
              <p style={{ fontWeight: '700', fontSize: '14px', color: '#0E0D0D', margin: 0 }}>{attendee.name}</p>
              <p style={{ fontSize: '12px', color: '#888', margin: '3px 0 0' }}>{attendee.ticket}</p>
            </div>

            {attendee.checkedIn ? (
              <span style={{
                background: '#d4edda',
                color: '#276749',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
              }}>
                ✓ Done
              </span>
            ) : (
              <button
                onClick={() => handleCheckIn(attendee.id)}
                style={{
                  background: '#800020',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Check-In
              </button>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: '14px', padding: '20px 0' }}>
            No attendees match your search.
          </p>
        )}
      </div>
    </div>
  </div>
  )
}

export default CheckInModal

import { useEffect, useState } from 'react'

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  background: '#F5F5F5',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#333',
  outline: 'none',
  fontFamily: 'Poppins, sans-serif',
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  color: '#555',
  marginBottom: '6px',
  fontWeight: '500',
}

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
}

function CreateEventModal({ isOpen, onClose, eventToEdit, onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [datetime, setDatetime] = useState('')
  const [category, setCategory] = useState('Conference')
  const [location, setLocation] = useState('')
  const [organizerName, setOrganizerName] = useState('')
  const [organizerEmail, setOrganizerEmail] = useState('')
  const [capacity, setCapacity] = useState('')
  const [price, setPrice] = useState('')

  const resetForm = () => {
    setTitle(''); setDescription(''); setDatetime(''); setCategory('Conference')
    setLocation(''); setOrganizerName(''); setOrganizerEmail(''); setCapacity(''); setPrice('')
  }

  useEffect(() => {
    if (!isOpen) return

    if (eventToEdit) {
      setTitle(eventToEdit.title || '')
      setDescription(eventToEdit.description || '')
      setDatetime(eventToEdit.datetime || eventToEdit.date || '')
      setCategory(eventToEdit.category || 'Conference')
      setLocation(eventToEdit.location || '')
      setOrganizerName(eventToEdit.organizerName || '')
      setOrganizerEmail(eventToEdit.organizerEmail || '')
      setCapacity(eventToEdit.attendees || '')
      setPrice(eventToEdit.price || '')
      return
    }

    resetForm()
  }, [isOpen, eventToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      id: eventToEdit?.id || Date.now(),
      title,
      description,
      date: datetime ? new Date(datetime).toLocaleString() : 'TBD',
      time: datetime ? new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD',
      category,
      location,
      organizerName,
      organizerEmail,
      attendees: capacity || '0/150',
      price,
      spots: `${Math.max(0, Number(capacity || 0) - 10)} spots left`,
    }

    if (typeof onSubmit === 'function') {
      onSubmit(payload)
    } else {
      console.log(payload)
    }
    onClose()
  }

  const handleCancel = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      onClick={handleCancel}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
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
          maxWidth: '620px',
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
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0E0D0D' }}>
          {eventToEdit ? 'Edit Event' : 'Create New Event'}
        </h2>
        <button onClick={handleCancel} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#999', cursor: 'pointer', lineHeight: 1, paddingTop: '4px' }}>×</button>
      </div>

      <p style={{ fontSize: '13px', color: '#888', marginBottom: '28px', lineHeight: '1.6' }}>
        Fill in the details below to create a new event for attendees to discover and RSVP.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

        <div>
          <label style={labelStyle}>Event Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="HTML Fundamental Workshop" style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your event..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={rowStyle}>
          <div>
            <label style={labelStyle}>Date & Time</label>
            <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
              <option>Conference</option>
              <option>Workshop</option>
              <option>Meetup</option>
              <option>Graduation</option>
              <option>Concert</option>
              <option>Sports</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="36 Recreational Center, Ikeja, Lagos" style={inputStyle} />
        </div>

        <div style={rowStyle}>
          <div>
            <label style={labelStyle}>Organizer Name</label>
            <input value={organizerName} onChange={e => setOrganizerName(e.target.value)} placeholder="Wealth Happiness" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Organizer Email</label>
            <input type="email" value={organizerEmail} onChange={e => setOrganizerEmail(e.target.value)} placeholder="Wealth@gmail.com" style={inputStyle} />
          </div>
        </div>

        <div style={rowStyle}>
          <div>
            <label style={labelStyle}>Capacity</label>
            <input type="number" value={capacity} onChange={e => setCapacity(e.target.value)} placeholder="096" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Price (₦)</label>
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Free" style={inputStyle} />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '15px',
              background: '#800020',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {eventToEdit ? 'Save Changes' : 'Create Event'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: '15px 28px',
              background: '#FFECF1',
              color: '#800020',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default CreateEventModal

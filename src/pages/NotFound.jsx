import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      fontFamily: "'Segoe UI', sans-serif",
      color: '#fff',
      textAlign: 'center',
      padding: '24px',
    }}>

      {/* Big 404 */}
      <h1 style={{
        fontSize: 'clamp(100px, 20vw, 180px)',
        fontWeight: 900,
        margin: 0,
        lineHeight: 1,
        background: 'linear-gradient(90deg, #a78bfa, #f472b6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-4px',
        userSelect: 'none',
      }}>
        404
      </h1>

      {/* Icon */}
      <div style={{ fontSize: '52px', margin: '8px 0 16px' }}>🎟️</div>

      {/* Headline */}
      <h2 style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        fontWeight: 700,
        margin: '0 0 12px',
        color: '#e2e8f0',
      }}>
        This event doesn't exist
      </h2>

      {/* Sub-text */}
      <p style={{
        fontSize: '16px',
        color: '#94a3b8',
        maxWidth: '380px',
        lineHeight: 1.6,
        margin: '0 0 36px',
      }}>
        The page you're looking for may have been moved, deleted, or never existed.
        Let's get you back on track.
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: '2px solid #a78bfa',
            background: 'transparent',
            color: '#a78bfa',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#a78bfa'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#a78bfa'
          }}
        >
          ← Go back
        </button>

        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(90deg, #a78bfa, #f472b6)',
            color: '#fff',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(167,139,250,0.35)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Go home
        </button>
      </div>
    </div>
  )
}

export default NotFound

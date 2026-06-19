import { useNavigate } from 'react-router-dom'

function Logo({page}) {
  const navigate = useNavigate()
  return (
    <img src={page=="auth"?"/auth-logo.png":"/logo.png"} alt="Gatherly Logo" className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', width: '190px' }} />
  )
}

export default Logo

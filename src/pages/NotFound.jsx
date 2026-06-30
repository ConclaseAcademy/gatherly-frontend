import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
function NotFound() {
  const navigate = useNavigate()

  const styles = {
    page:{
      minHeight:"100vh",
      background:"#fff",
      fontFamily:"Inter, Arial, sans-serif",
      color:"#111827"
    },

    
   
    hero:{
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      gap:"50px",
      padding:"80px 8%"
    },

    text:{
      maxWidth:"500px"
    },

    error:{
      color:"#6d28d9",
      fontWeight:700,
      marginBottom:"25px"
    },

    title:{
      fontSize:"64px",
      lineHeight:"1.05",
      margin:"0 0 25px"
    },

    desc:{
      fontSize:"18px",
      lineHeight:"1.7",
      color:"#64748b",
      marginBottom:"35px"
    },

    image:{
      width:"50%"
    },

    svg:{
      width:"100%"
    }
  };

  return (
     <> 
       <div style={styles.page}>
        <Navbar />
      <main style={styles.hero}>


        <section style={styles.text}>


          <p style={styles.error}>
            404 error
          </p>


          <h1 style={styles.title}>
            Under maintenance
          </h1>


          <p style={styles.desc}>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>


          <button 
          onClick={() => navigate('/')}
          style={{
             background:'#8a0029',
              color:'#e1ccd2',
              border:'none',
              padding:'12px 18px',
             borderRadius:'8px',
            cursor:'pointer'
 
          }}>
            ← Go Back Home
          </button>


        </section>





        {/* SVG 404 */}

        <section style={styles.image}>


          <svg
            viewBox="0 0 700 300"
            style={styles.svg}
          >

            <g
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
            >

              <line x1="20" y1="40" x2="680" y2="40"/>
              <line x1="20" y1="250" x2="680" y2="250"/>


              {/* 4 */}

              <line x1="120" y1="40" x2="120" y2="250"/>
              <line x1="40" y1="160" x2="180" y2="160"/>
              <line x1="40" y1="160" x2="120" y2="40"/>


              {/* 0 */}

              <circle cx="350" cy="145" r="90"/>
              <circle cx="350" cy="145" r="45"/>


              {/* 4 */}

              <g transform="translate(380,0)">

                <line x1="120" y1="40" x2="120" y2="250"/>
                <line x1="40" y1="160" x2="180" y2="160"/>
                <line x1="40" y1="160" x2="120" y2="40"/>

              </g>


            </g>

          </svg>


        </section>


      </main>  

      
       </div>

    
     </>
    
  )
}

export default NotFound

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventsPage from "./pages/Events";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';


function App() {
    return (
        <>
           <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            
        </Routes>
        </>
    );
}

export default App;
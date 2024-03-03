import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import DoctorPage from './pages/DoctorPage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <div className="flex-grow-1 p-3">
      <Router>
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/login' exact Component={Login} />
          <Route path='/signup' exact Component={Signup} />
          <Route path='/doctor/:doc_id' exact Component={DoctorPage} />
        </Routes>
      </Router>
    </div>
    <Footer />
  </div>,
)

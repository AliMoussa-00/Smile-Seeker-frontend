import { Link } from 'react-router-dom';
import logo from '../assets/images/ss_logo_no_bg.png';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import '../assets/styles/landingPage.css'; // Import CSS for styling

const LandingPage = () => {

    return (
        <MDBContainer>
            <MDBRow className='mt-2'>
                <MDBCol className="d-flex justify-content-center align-items-center" xs={12} md={5}>
                    <img
                        src={`${logo}`}
                        alt="Smile Seeker Logo"
                        style={{ height: '300px' }}
                    />
                </MDBCol>
                <MDBCol md={7} className="d-flex justify-content-center">
                    <MDBContainer className="text-container">
                        <h1 className="heading">Welcome to Smile Seeker</h1>
                        <p>Find the perfect dentist for your needs and book appointments effortlessly.</p>
                        <p className="subheading">With Smile Seeker, you can:</p>
                        <div className="list-group list-group-light text-start">
                            <a href="#" className="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-1 list-group-item-info">
                                Search for doctors based on specialty, location, and availability
                            </a>
                            <a href="#" className="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-1 list-group-item-info">
                                View detailed profiles and reviews of doctors to make informed decisions
                            </a>
                            <a href="#" className="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-1 list-group-item-info">
                                Book appointments online with just a few clicks
                            </a>
                            <a href="#" className="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-1 list-group-item-info">
                                Receive reminders for upcoming appointments
                            </a>
                            <a href="#" className="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-1 list-group-item-info">
                                Share your feedback and experiences by leaving reviews
                            </a>
                            <a href="#" className="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-1 list-group-item-info">
                                Take the first step towards a healthier smile today!
                            </a>
                        </div>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-3'>
                <MDBCol className="d-flex justify-content-center">
                    <Link to="/home" className="button">Get Started</Link>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default LandingPage;

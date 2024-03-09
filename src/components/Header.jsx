import { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";


export default function Header() {
    // check if the user is in localStorage
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [isDoc, setIsDoc] = useState(localStorage.getItem('isDoc'));
    const [picture, setPicture] = useState(null)

    // Update state whenever localStorage changes
    useEffect(() => {
        // fetch image
        const fetchImage = async (userId) => {
            if (userId) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/api/v1/image/${userId}`);
                    if (!response.ok) {
                        console.log('Failed to fetch image');
                    }
                    const blob = await response.blob();
                    const objectUrl = URL.createObjectURL(blob);
                    setPicture(objectUrl);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };

        // Listen for storage events to update state
        window.addEventListener('storage', () => {
            setUserId(localStorage.getItem('userId'));
            setIsDoc(localStorage.getItem('isDoc'));

        });

        fetchImage(userId)
    }, [userId]); // Run effect only once, on component mount


    return (
        <header>
            <Navbar bg="light" expand="lg" fluid className="px-lg-4 py-lg-2 justify-content-between">
                <Navbar.Brand href="/">
                    <img
                        src="src/assets/images/ss_logo_no_bg.png"
                        alt="ss_logo"
                        loading='lazy'
                        style={{ objectFit: 'contain', height: '50px', width: '50px' }}
                    />
                </Navbar.Brand>
                <Navbar.Text className="" style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>
                    Find the dentist near you
                </Navbar.Text>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-lg-none flex-grow-0">
                    <Nav>
                        {
                            userId
                                ?
                                <Nav.Link href={isDoc === "true" && `/docappointments/${userId}`}>
                                    <img
                                        src={`${picture}`}
                                        // src="src/assets/images/ss_logo_no_bg.png"
                                        alt="userPic"
                                        className='img-fluid rounded-circle'
                                        style={{ objectFit: 'contain', width: '40px', height: '40px' }}
                                    />
                                </Nav.Link>
                                :
                                <Nav.Link href="/login">
                                    <button type="button" className="btn btn-outline-info">Login</button>
                                </Nav.Link>
                        }
                    </Nav>
                    <Nav>
                        {
                            userId &&
                            <Nav.Link href="/">
                                <button
                                    type="button"
                                    className="btn btn-outline-info"
                                    onClick={() => {
                                        localStorage.removeItem('userId')
                                        localStorage.removeItem('userImage')
                                        localStorage.removeItem('isDoc')
                                        setUserId(null)
                                        setIsDoc(null)
                                    }}
                                >Logout</button>
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
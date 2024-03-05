import { Navbar, Nav } from "react-bootstrap";

export default function Header() {

    return (
        <header>
            <Navbar bg="light" expand="lg" fluid className="px-lg-4 py-lg-2 justify-content-between">
                <Navbar.Brand href="/">
                    <img
                        src="src/assets/images/ss_logo_no_bg.png"
                        alt="ss_logo"
                        height='50'
                        loading='lazy'
                    />
                </Navbar.Brand>
                <Navbar.Text className="" style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>
                    Find the dentist near you
                </Navbar.Text>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-lg-none flex-grow-0">
                    <Nav>
                        <Nav.Link href="/login">
                            <button type="button" className="btn btn-outline-info">Login</button>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/signup">
                            <button type="button" className="btn btn-outline-info ms-2">Sign up</button>
                        </Nav.Link>
                    </Nav>
                    <Nav >
                        <Nav.Link href="/docappointments">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
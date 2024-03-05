import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const DocAppoint = () => {
    const [accepted, setAccepted] = useState(false);
    const handleClickAccept = () => setAccepted(!accepted);

    return (
        <MDBCard>
            <MDBCardBody>
                <div className='d-flex align-items-center'>
                    <img
                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                        alt=''
                        style={{ width: '60px', height: '60px' }}
                        className='rounded-circle'
                    />
                    <div className='ms-4 me-auto px-2'>
                        <p className='fw-bold mb-1'>John Doe</p>
                        <p className='text-muted mb-0'>
                            <FontAwesomeIcon icon={faEnvelope} className='me-3' /> <span className='me-3'>john.doe@gmail.com</span>
                        </p>
                        <p className='text-muted mb-0'>
                            <FontAwesomeIcon icon={faPhoneAlt} className='me-3' /> <span>+2123423423452</span>
                        </p>
                        <p className='text-muted mb-0'>
                            <FontAwesomeIcon icon={faCalendarAlt} className='me-3' /> <b> 04/06/2024</b> in <b>three days</b>
                        </p>
                    </div>
                    <div>
                        {!accepted
                            ?
                            <button
                                type="button"
                                className="btn btn-outline-success me-1"
                                onClick={handleClickAccept}
                            >
                                Accept
                            </button>
                            :
                            <button
                                type="button"
                                className="btn btn-outline-warning"
                                onClick={handleClickAccept} // set a new appointment date
                            >
                                Reschedule
                            </button>
                        }

                        <button type="button" className="btn btn-outline-danger">Decline</button>
                    </div>
                </div>

            </MDBCardBody>
        </MDBCard>
    );
}
export default DocAppoint;
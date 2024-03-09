/* eslint-disable react/prop-types */
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

const acceptAppointment = async (appointment, callback) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/appointments/${appointment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment),
        });

        if (!response.ok) {
            console.log('Failed to update appointment');
        } else {
            console.log('Appointment updated successfully');
            callback()
        }
    } catch (error) {
        console.error('Error updating Appointment:', error);
    }
}

const DocAppoint = ({ appointment, deleteAppointment }) => {
    const [user, setUser] = useState(null);
    const [userPicture, setUserPicture] = useState(null);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        const fetchPicture = async (userId) => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/image/${userId}`);
                if (!response.ok) {
                    console.log('Failed to fetch image');
                }
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                setUserPicture(objectUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        const fetchUser = async (userId) => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${userId}`);
                if (!response.ok) {
                    console.log('Failed to fetch User for Appointment');
                }
                else {
                    const appointmentsData = await response.json();
                    setUser(appointmentsData);
                }
            } catch (error) {
                console.error('Error fetching User for Appointment:', error);
            }
        }

        fetchUser(appointment.user_id)
        fetchPicture(appointment.user_id)

    }, [appointment]);

    const formattedDate = () => {
        const date = new Date(appointment?.appointment_date);

        return (date.toLocaleDateString('en-US', {
            day: 'numeric', // Numeric day (e.g., 1, 2, ..., 31)
            month: 'long', // Full month name (e.g., January, February, ..., December)
            year: 'numeric' // Numeric year (e.g., 2022)
        }));
    }
    const getDaysLeft = () => {
        // get date object from isoformat
        const date = new Date(appointment?.appointment_date);

        // Calculate the difference in milliseconds between the given date and today's date
        const differenceInMs = date - new Date();

        // Convert milliseconds to days
        const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

        return (`Days left: ${differenceInDays}`);
    }

    const handleClickAccept = () => {

        acceptAppointment({ ...appointment, accepted: true }, () => {
            setAccepted(true);
        });
    }

    return (
        <MDBCard>
            <MDBCardBody>
                <div className='d-flex align-items-center'>
                    <img
                        src={userPicture ? userPicture : 'https://mdbootstrap.com/img/new/avatars/8.jpg'}
                        alt=''
                        style={{ width: '60px', height: '60px' }}
                        className='rounded-circle'
                    />
                    <div className='ms-4 me-auto px-2'>
                        <p className='fw-bold mb-1'>{user?.first_name} {user?.last_name}</p>
                        <p className='text-muted mb-0'>
                            <FontAwesomeIcon icon={faEnvelope} className='me-3' /> <span className='me-3'>{user?.email}</span>
                        </p>
                        <p className='text-muted mb-0'>
                            <FontAwesomeIcon icon={faPhoneAlt} className='me-3' /> <span>{user?.phone}</span>
                        </p>
                        <p className='text-muted mb-0'>
                            <FontAwesomeIcon icon={faCalendarAlt} className='me-3' /> <b>{appointment && formattedDate()}</b> in <b>{appointment && getDaysLeft()}</b>
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
                            // onClick={}
                            >
                                Reschedule
                            </button>
                        }

                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={deleteAppointment} // Delete appointment
                        >
                            Decline
                        </button>
                    </div>
                </div>

            </MDBCardBody>
        </MDBCard>
    );
}
export default DocAppoint;
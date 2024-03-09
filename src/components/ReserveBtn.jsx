import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BasicDatePicker from "./DatePicker";

const createAppointment = (userData, callback) => {
    const { docId, userId, selectedDate } = userData;
    const requestData = {
        doctor_id: docId,
        user_id: userId,
        appointment_date: selectedDate.toISOString()
    };

    fetch(`http://127.0.0.1:5000/api/v1/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            // send the image to the backend
            console.log("Appointment created: ", data)
            callback();
        })
        .catch(error => {
            console.error("Error creating appointment :", error);
        });
}

const ReserveBtn = (props) => {
    // eslint-disable-next-line react/prop-types
    const docId = props.docId;
    const navigate = useNavigate()

    const userId = localStorage.getItem('userId');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDateChange = (date) => {
        // Manually adjust the date
        // const newDate = dayjs(date).add(1, 'day'); // Increment the day by 1 to get the correct date
        setSelectedDate(date);
        // console.log(date)
    };
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const gotoLogin = () => {
        navigate("/login")
    }

    const handleSubmit = () => {
        if (selectedDate) {
            createAppointment({ docId, userId, selectedDate }, () => {
                setShowModal(false)
                alert("You have successfully reserved an appointment ")
            })
        }
        else {
            alert('Please select a day for the appointment')
        }
    }

    return (
        <>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button
                    className="btn btn-primary" type="button"
                    onClick={handleShowModal}
                >
                    Reserve an appointment
                </button>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{
                        userId
                            ? 'Please select a day'
                            : 'Login Required'
                    }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userId ? (
                        <>
                            <p>Please choose a day for the appointment</p>
                            <BasicDatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
                        </>
                    ) : (
                        <>
                            <p>Please subscribe to reserve an appointment.</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {userId
                        ?
                        <>
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </>
                        :
                        <>
                            <button
                                type="button" className="btn btn-secondary" onClick={handleCloseModal}
                                data-mdb-ripple-init data-mdb-dismiss="modal"
                            >
                                Close
                            </button>
                            <button className="btn btn-primary" onClick={gotoLogin}>Subscribe</button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ReserveBtn;
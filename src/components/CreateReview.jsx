import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const CreateReview = ({ docId, docName, addReviewToList }) => {
    const userId = localStorage.getItem('userId');
    const [review, setReview] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const navigate = useNavigate()

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        createReview(() => {
            setReview('');
            setShowModal(false);

            // show success Alert
            setTimeout(() => {
                setShowSuccessMessage(true);
                // After three seconds, set showSuccessMessage back to false
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 4000);
            }, 1000); // Simulating a delay of 1 second for the request
        })
    };

    const gotoLogin = () => {
        navigate("/login")
    }

    const createReview = (callback) => {
        const requestData = {
            doctor_id: docId,
            user_id: userId,
            comment: review
        };

        fetch(`http://127.0.0.1:5000/api/v1/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                callback();
                addReviewToList(data);
            })
            .catch(error => {
                console.error("Error creating Review :", error);
            });
    }

    return (
        <>

            <Button className="mt-3" variant="primary" onClick={handleShowModal}>
                Add Review
            </Button>
            {showSuccessMessage && (
                <Alert variant="success">
                    your review has been submitted!
                </Alert>
            )}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        userId
                            ?
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="review">
                                    <Form.Label>
                                        Please tell us what do you think about <b> {docName}</b>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter your review"
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Form>
                            :
                            <p>Please subscribe to reserve an appointment.</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {userId
                        ?
                        <>
                            <Button
                                variant="primary" type="submit"
                                onClick={handleSubmit}
                            >
                                Submit Review
                            </Button>
                        </>
                        :
                        <>
                            <button className="btn btn-primary" onClick={gotoLogin}>Subscribe</button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateReview;

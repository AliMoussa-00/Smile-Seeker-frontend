import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateReview = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [review, setReview] = useState('');

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Name:', name);
        console.log('Review:', review);
        // Reset form fields or close modal after submission
        setName('');
        setReview('');
        setShowModal(false);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShowModal}>
                Add Review
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="review">
                            <Form.Label>Your Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit Review
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateReview;

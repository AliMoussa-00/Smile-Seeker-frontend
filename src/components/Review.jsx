/* eslint-disable react/prop-types */
import { MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

const Review = ({ review }) => {
    const [user, setUser] = useState(null);
    const [userPicture, setUserPicture] = useState(null);

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

        fetchUser(review.user_id)
        fetchPicture(review.user_id)

    }, [review]);

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
                    <div className='ms-4'>
                        <p className='fw-bold mb-1'>{user?.first_name} {user?.last_name}</p>
                        <p className='text-muted mb-0'>{user?.email}</p>
                    </div>
                </div>
                <MDBCardText className="mt-2 ms-1">{review.comment}</MDBCardText>
            </MDBCardBody>
        </MDBCard>
    )
}

export default Review;
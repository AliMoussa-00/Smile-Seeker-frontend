
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DocMap from '../components/DocMap';
import ReserveBtn from '../components/ReserveBtn';
import Review from '../components/Review';
import CreateReview from '../components/CreateReview';



const DoctorPage = () => {
    const location = useLocation();
    const [doctor, setDoctor] = useState(null);
    const [picture, setPicture] = useState(null);
    const isDoc = localStorage.getItem('isDoc');
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        const doctorData = location.state;
        setDoctor(doctorData);

        const fetchPicture = async (doc_id) => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/image/${doc_id}`);
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
        fetchPicture(doctorData.id)

        const fetchReviews = async (doc_id) => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/doc_reviews/${doc_id}`);
                if (!response.ok) {
                    console.log('Failed to fetch Reviews');
                }
                else {
                    const reviewsData = await response.json(); // Parse JSON response
                    setReviews(reviewsData);
                    console.log(reviewsData)
                }
            } catch (error) {
                console.error('Error fetching Reviews:', error);
            }
        }
        fetchReviews(doctorData.id)

    }, [location.state]);

    // add the created review to the list of reviews
    const addReviewToList = (newReview) => {
        setReviews([...reviews, newReview])
    }


    return (
        <MDBContainer className="py-4">
            <MDBRow>
                <MDBCol md="3" className='d-flex align-items-center  justify-content-center'>
                    <MDBCard style={{ width: '300px' }}>
                        <MDBCardImage
                            src={picture ? picture : 'https://placehold.co/200x150@2x.png'}
                            className="card-img-top" alt="Doctor"
                            style={{ objectFit: 'contain', height: '200px' }}

                        />
                    </MDBCard>
                </MDBCol>
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle className="text-center">
                                {`${doctor?.first_name} ${doctor?.last_name}`}
                            </MDBCardTitle>
                            <MDBCardText>
                                <p>Email: {doctor?.email}</p>
                                <p>Phone: {doctor?.phone}</p>
                                <p>{doctor?.description}</p>
                                <p>address: Lorem ipsum dolor sit amet</p>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-5'>
                <MDBCol>
                    <h3>Location</h3>
                </MDBCol>
            </MDBRow>
            <MDBRow className='d-flex justify-content-center'>
                <MDBCol md='8'>
                    <DocMap />
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-5 d-flex justify-content-center'>
                <MDBCol md='6'>
                    <ReserveBtn docId={doctor?.id} />
                </MDBCol>
            </MDBRow>
            <MDBRow className='mt-5'>
                <MDBCol>
                    <h3>Reviews</h3>
                </MDBCol>
            </MDBRow>
            {
                reviews?.length > 0
                    ?
                    reviews.map((review) => (
                        <MDBRow className='mt-5 d-flex justify-content-center' key={review.id}>
                            <MDBCol md='6'>
                                <Review review={review} showBtn={false} deleteReview={()=>{} } />
                            </MDBCol>
                        </MDBRow>
                    ))
                    :
                    <h6>There are no reviews for now</h6>
            }
            {/* create a Review only if not a doctor or user not logged in */}
            {(localStorage.getItem('userId') === null || isDoc === 'false') &&
                <CreateReview docId={doctor?.id} docName={doctor?.first_name} addReviewToList={addReviewToList} />
            }
        </MDBContainer>
    )
}

export default DoctorPage;
import { MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";

const Review = () => {
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
                    <div className='ms-4'>
                        <p className='fw-bold mb-1'>John Doe</p>
                        <p className='text-muted mb-0'>john.doe@gmail.com</p>
                    </div>
                </div>
                <MDBCardText>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, corporis aliquid vel maiores dicta nisi tenetur fugiat adipisci. Nisi perferendis aliquid hic recusandae reprehenderit repellendus veritatis repudiandae nostrum eos minima?
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    )
}

export default Review;
import { useEffect, useState } from "react";
import DocCard from "../components/DocCard";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

function Home() {
    const [doctors, setDoctors] = useState([]);

    const API_URL = 'http://localhost:5000/api/v1/doctors';
    const getDoctors = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        setDoctors(data);
    }

    useEffect(() => {
        getDoctors();
    }, [])

    return (
        <>
            {
                doctors?.length === 0
                    ? (
                        <h2>No doctors</h2>
                    )
                    : (
                        < MDBRow className='row-cols-1 row-cols-md-3 g-4' >
                            {doctors.map((doctor) => (
                                <MDBCol
                                    key={doctor.id}
                                >
                                    <DocCard doctor={doctor} />
                                </MDBCol>))}
                        </MDBRow >
                    )
            }
        </>
    );
}

export default Home
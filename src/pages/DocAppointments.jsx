import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import DocAppoint from '../components/DocAppoint';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const DocAppointment = () => {
    const { doc_id } = useParams();
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const fetchAppointment = async (doc_id) => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/doc_appointments/${doc_id}`);
                if (!response.ok) {
                    console.log('Failed to fetch Appointment');
                }
                else {
                    const appointmentsData = await response.json(); // Parse JSON response
                    setAppointments(appointmentsData);
                }
            } catch (error) {
                console.error('Error fetching appointment:', error);
            }
        }
        fetchAppointment(doc_id)

    }, [doc_id]);


    const deleteAppointment = async (appointment) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/appointments/${appointment.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                console.log('Failed to delete appointment');
            } else {
                console.log('Appointment deleted successfully');
                // removing it from list of appointment
                setAppointments(appointments.filter(appoint => appoint.id !== appointment.id));
                console.log(appointments.length)
            }
        } catch (error) {
            console.error('Error deleting Appointment:', error);
        }
    };


    return (
        <MDBContainer>
            <MDBRow className='mt-5'>
                <MDBCol>
                    <h3>Appointments</h3>
                </MDBCol>
            </MDBRow>
            {
                appointments.length > 0
                    ?
                    appointments.map((appointment) => (
                        <MDBRow className='mt-3 justify-content-center' key={appointment.id}>
                            <MDBCol md='8'>
                                <DocAppoint appointment={appointment} deleteAppointment={() => { deleteAppointment(appointment) }} />
                            </MDBCol>
                        </MDBRow>
                    ))
                    :
                    <h3>No appointments</h3>
            }
        </MDBContainer>
    );
}

export default DocAppointment;
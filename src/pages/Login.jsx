import { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add login logic here
        setError(false)
        checkLoginDoc(formData, () => { navigate("/home"); })
    };

    // will be called if the user trying to log in is not a doc
    const checkLoginUser = (requestData, callback) => {
        fetch(`http://127.0.0.1:5000/api/v1/log_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                // send the image to the backend
                localStorage.setItem('userId', data.id);
                localStorage.setItem('isDoc', false);
                window.dispatchEvent(new Event("storage"));

                callback();

            })
            .catch(error => {
                console.error("Not Doc Not User", error);
                setError(true)
            });
    }
    // will be first called when the user try to login
    // if not doc then we will check if user
    const checkLoginDoc = (requestData, callback) => {
        fetch(`http://127.0.0.1:5000/api/v1/log_doc`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                // send the image to the backend
                localStorage.setItem('userId', data.id);
                localStorage.setItem('isDoc', true);
                window.dispatchEvent(new Event("storage"));

                callback();

            })
            .catch(error => {
                console.error("Error Not LOGED IN DOC", error);
                checkLoginUser(requestData, callback)
            });
    }

    return (
        <MDBContainer className="py-4">
            <MDBRow className="justify-content-center">
                <MDBCol md="5">
                    <div className="d-flex justify-content-center">
                        <img
                            src="src/assets/images/ss_logo_no_bg.png"
                            alt="Login Image"
                            className="img-fluid shadow-4 w-50"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='2'>
                                <label htmlFor="email" className="col-form-label">Email</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={`form-control ${error ? 'is-invalid' : ''}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='2'>
                                <label htmlFor="password" className="col-form-label">Password</label>
                            </MDBCol>
                            <MDBCol >
                                <MDBInput
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={`form-control ${error ? 'is-invalid' : ''}`}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <div className="d-grid gap-2">
                            <input className="btn btn-primary" type="submit" value="Submit"></input>
                            <Link to="/signup">new here?</Link>
                        </div>

                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;
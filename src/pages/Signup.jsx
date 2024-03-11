import { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBFile, MDBTextArea } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";


const Signup = () => {
    // to go the home page once the login is successfull
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isDoctor: false,
        address: '',
        description: '',
        profileImage: null,
    });
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [emailExists, setEmailExists] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData({ ...formData, isDoctor: checked });
    };
    const handleImageSelect = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            setFormData({ ...formData, profileImage: file });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordMatchError('Passwords do not match');
            return;
        }
        setPasswordMatchError('');
        setEmailExists(false);

        postData(formData, () => { navigate("/home"); })
    };

    const postData = (userData, callback) => {
        const { firstName, lastName, email, phone, password, address, description } = userData;

        const requestData = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            password,
            address,
            description
        };

        const API_END = userData.isDoctor ? "doctors" : "users";
        const image_api_endpoint = userData.isDoctor ? "doctors_pictures" : "users_pictures";

        fetch(`http://127.0.0.1:5000/api/v1/${API_END}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(async response => {
                if (response.ok) {
                    return response.json();
                }
                else if (response.status == 501) {
                    setEmailExists(true);
                    throw new Error("EEEEE Email already exists");
                }
                else {
                    // If the response status code indicates an error, throw an error with the response JSON
                    const errorData = response.json();
                    throw new Error(`error signing up: ${errorData}`);
                }
            })
            .then(data => {
                // send the image to the backend
                const user_id = data
                const image_api = `http://127.0.0.1:5000/api/v1/${image_api_endpoint}/${user_id}`
                postImage(
                    image_api,
                    `user_${user_id}_pic`,
                    userData.profileImage,
                    user_id,
                    userData.isDoctor,
                    callback
                );
            })
            .catch(error => {
                console.error("Error sending POST request:", error);
            });
    }

    const postImage = (image_api, imageName, image, user_id, isDoc, callback) => {

        // Create a new file object with the modified name
        const newImage = new File([image], imageName, {
            type: image.type,
        });

        const formData = new FormData();
        formData.append('image', newImage);

        fetch(image_api, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success image storage:", data);
                // store user ID and move to home page

                // Move to home page upon successful storage
                callback()
                // Store user data in localStorage
                localStorage.setItem('userId', user_id);
                localStorage.setItem('isDoc', isDoc);
                window.dispatchEvent(new Event("storage"));
            })
            .catch(error => {
                console.error("Error sending POST request:", error);
            });
    }

    return (
        <MDBContainer className="py-4">
            <MDBRow className="justify-content-center">
                <MDBCol md="5">
                    <form onSubmit={handleSubmit} >
                        <MDBRow className="mb-2 justify-content-center">
                            <MDBCol xs={6} md={4}>
                                <img
                                    src={formData.profileImage
                                        ? URL.createObjectURL(formData.profileImage)
                                        : 'src/assets/images/ss_logo_no_bg.png'
                                    }
                                    alt="Profile"
                                    className='img-fluid rounded-circle'
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4 justify-content-center">
                            <MDBCol md='6'>
                                <MDBFile
                                    size='sm'
                                    id='formFileLg'
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    style={{ marginBottom: 10 }}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="firstName" className="col-form-label">First name</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className='form-control' type='text'
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="lastName" className="col-form-label">Last name</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className='form-control' type='text'
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="email" className="col-form-label">email</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className={`form-control ${emailExists ? 'is-invalid' : ''}`}
                                    type='email'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="password" className="col-form-label">password</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className={`form-control ${passwordMatchError && 'is-invalid'}`}
                                    type='password'
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="confirmPassword" className="col-form-label">Confirm</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className={`form-control ${passwordMatchError && 'is-invalid'}`}
                                    type='password'
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-5" >
                            <MDBCol size="auto" md='3'>
                                <label htmlFor="phone" className="col-form-label">phone</label>
                            </MDBCol>
                            <MDBCol>
                                <MDBInput
                                    className='form-control' type='tel'
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-4">
                            <MDBCol>
                                <MDBCheckbox
                                    name='flexCheck'
                                    value=''
                                    id='flexCheckDefault'
                                    label='Are you a dentist ?'
                                    onChange={handleCheckboxChange}
                                    checked={formData.isDoctor}
                                />
                            </MDBCol>
                        </MDBRow>
                        {formData.isDoctor && ( // Conditionally render address input field
                            <>
                                <MDBRow className="mb-4">
                                    <MDBCol size="auto" md='3'>
                                        <label htmlFor="address" className="col-form-label">Address</label>
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput
                                            className='form-control'
                                            type='text'
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required={formData.isDoctor} // Make address required only for doctors
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <label htmlFor="description" className="col-form-label">
                                            Tell us about yourself:
                                        </label>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="mb-4">
                                    <MDBCol>
                                        <MDBTextArea
                                            id='textAreaExample'
                                            rows={4}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required={formData.isDoctor} />
                                    </MDBCol>
                                </MDBRow>
                            </>
                        )}
                        <div className="d-grid gap-2">
                            <input className="btn btn-primary" type="submit" value="Submit"></input>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Signup;
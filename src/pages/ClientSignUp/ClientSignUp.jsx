import React, {useState, useEffect} from 'react'
import './ClientSignUp.css'
import { Link, useLocation } from 'react-router-dom'
import serviceproviderformgif from '../../assets/serviceProviderFormGif.gif'
import google from '../../assets/google.webp'
import { CountrySelect, StateSelect, CitySelect } from 'react-country-state-city'
import "react-country-state-city/dist/react-country-state-city.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientSignUp = () => {
    const location = useLocation(); // Get the location object
    const [step, setStep] = useState(0);
   
    const [formData, setFormData] = useState({
        firstName: '', // Changed from 'firstname' to 'firstName'
        lastName: '',  // Changed from 'lastname' to 'lastName'
        email: '',
        password: '',
        phoneNumber: '',
        profession: '',
        position: '',
        country: '',
        countryId: 0,
        state: '',
        stateId: 0,
        city: '',
        cityId: 0, // Added cityId for proper tracking
        role: location.state?.role || "ROLE_CLIENT"
    });

    useEffect(() => {
        if (location.state && location.state.role) {
            console.log("Role received:", location.state.role);
            setFormData(prevData => ({ ...prevData, role: location.state.role }));
        }
    }, [location.state]);

    const handleChange =(value) =>{
        setFormData({ ...formData, phoneNumber: value });
    };

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerPayload = {
            firstName: formData.firstName,   // Changed field name
            lastName: formData.lastName,     // Changed field name
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            role: formData.role,
            profession: formData.profession,
            position: formData.position,
            hourlyRate: formData.hourlyRate,
            country: formData.country,
            state: formData.state,
            city: formData.city
        };

        console.log('Sending payload:', registerPayload); // Debug log

        try {
            const response = await fetch('http://localhost:9090/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerPayload)
        });

            if (response.ok) {
            const data = await response.json();
            toast.success('Registration successful!', {
                position: "top-center",
                autoClose: 1300,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
            // Redirect to login or dashboard
            } else {
            const error = await response.json();
            toast.error(error.message, {
                position: "top-center",
                autoClose: 1300,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            console.error('Registration error:', error);
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        }
    };

  return (
    <div className="serviceProviderFormContainer">
        <img src={serviceproviderformgif} alt="" className='serviceProviderFormImg'/>
        <form className="signup_form_container" onSubmit={handleSubmit}>
            <div className="title_container">
                <p className="title">Register as a Client</p>
                <span className="subtitle">Create and account and hire the services of providers around the world.</span>
            </div>

            {step === 0 && (
                <div className='firstStep'>
                    <div className="input_container">
                        <label className="input_label" htmlFor="firstName_field">Firstname</label>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="#141B34" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" />
                        </svg>
                        <input 
                            placeholder="Tom" 
                            title="Input first name" 
                            name="firstName" 
                            type="text" 
                            className="signup_input_field" 
                            id="firstName_field" 
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>

                    <div className="input_container">
                        <label className="input_label" htmlFor="lastName_field">Lastname</label>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#141B34"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1"
                            />
                            <circle
                                cx="9"
                                cy="7"
                                r="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M23 20v-1a4 4 0 00-3-3.87"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 3.13a4 4 0 010 7.75"
                            />
                        </svg>

                        <input 
                            placeholder="Holland" 
                            title="Input last name"
                            name="lastName" 
                            type="text" 
                            className="signup_input_field" 
                            id="lastName_field" 
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>
            )}

            {step === 1 && (
                <div className="secondStep">
                    <div className="input_container">
                        <label className="input_label" htmlFor="email_field">Email</label>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                            <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                        </svg>
                        <input 
                            placeholder="name@mail.com" 
                            title="Input email" 
                            name="email" 
                            type="email" 
                            className="signup_input_field" 
                            id="email_field" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="input_container">
                        <label className="input_label" htmlFor="password_field">Password</label>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                            <path strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                            <path fill="#141B34" d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"></path>
                        </svg>
                        <input 
                            placeholder="Password" 
                            title="Input password" 
                            name="password" 
                            type="password" 
                            className="signup_input_field" 
                            id="password_field" 
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="sixthStep">
                    <div className="group" id='phoneNo'>
                        <label htmlFor="" >
                            <label className="input_label" htmlFor="phone_field">Phone Number</label>
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="NG"
                                value={formData.phoneNumber}
                                onChange={(value) => setFormData({ ...formData, phoneNumber: value })}  
                            />     
                        </label>     
                    </div>

                    <div className="input_container">
                        <label className="input_label" htmlFor="occupation_field">Profession</label>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                            <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                        </svg>
                        <input 
                            placeholder="Plumber" 
                            title="Input occupation" 
                            name="occupation" 
                            type="text" 
                            className="signup_input_field" 
                            id="occupation_field" 
                            required
                            value={formData.profession}
                            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        />
                    </div>

                    <div className="input_container">
                        <label className="input_label" htmlFor="occupation_field">Job Title</label>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                            <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                        </svg>
                        <input 
                            placeholder="Plumber" 
                            title="Input occupation" 
                            name="occupation" 
                            type="text" 
                            className="signup_input_field" 
                            id="occupation_field" 
                            required
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        />
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className='sixthStep'>
                    <div className="input_container" id='country'>
                        <label className="input_label" htmlFor="country_field">Select Country</label>
                        <CountrySelect
                            onChange={(e) => {
                                // console.log('Country selected:', e); 
                                setFormData(prevData => ({ 
                                    ...prevData, 
                                    country: e.name, 
                                    countryId: e.id, 
                                    state: '', 
                                    stateId: 0, 
                                    city: '',
                                    cityId: 0 
                                }));
                            }}
                            placeHolder="Select Country"
                            style={{border: "none", outline: "none"}}
                            className="input_field"
                        />
                    </div>

                    <div className="input_container" id='state'>
                        <label className="input_label" htmlFor="state_field">Select State</label>
                        <StateSelect
                            disabled={!formData.countryId}
                            countryid={formData.countryId}
                            onChange={(e) => {
                                setFormData(prevData => ({ 
                                    ...prevData, 
                                    state: e.name, 
                                    stateId: e.id, 
                                    city: '',
                                    cityId: 0 
                                }));
                            }}
                            placeHolder="Select State"
                            style={{border: "none", outline: "none"}}
                            className='input_field'
                        />
                    </div>

                    <div className="input_container" id='city'>
                        <label className="input_label" htmlFor="city_field">Select City</label>
                        <CitySelect
                            disabled={!formData.stateId}
                            countryid={formData.countryId}
                            stateid={formData.stateId}
                            onChange={(e) => {
                                setFormData(prevData => ({ 
                                    ...prevData, 
                                    city: e.name,
                                    cityId: e.id 
                                }));
                            }}
                            placeHolder="Select City"
                            style={{border: "none", outline: "none"}}
                            className='input_field'
                        />
                    </div>
                </div>
            )}

            <div className="prevNextButtons">
                    {step > 0 && (
                        <button type="button" onClick={prevStep}>
                            Previous
                        </button>
                    )}
                    {step < 3 && (
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    )}
            </div>

            {step === 3 && (
            <button title="Sign Up" type="submit" className="signUpBtn">
                <span>Register</span> 
            </button>
            )}

            {/* <div className="separator">
                <hr className='line'/>
                <span>Or</span>
                <hr className="line"/>
            </div>

            <button title="Sign Up with Google" type="submit" className="sign-up_ggl">
                <img src={google} alt="" className='signUpGoogle'/>
                <span>Sign Up with Google</span>
            </button> */}

            <p className="note">
                Already have an account? 
                <Link to="/Login" className="logInBtnLink">Log In</Link>
            </p>
            <ToastContainer
                position="top-center"
                autoClose={1200}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </form>
    </div>
  )
}

export default ClientSignUp
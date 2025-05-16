import React, {useState} from 'react'
import './ServiceProviderSignUp.css'
import { Link } from 'react-router-dom'
import serviceproviderformimg from '../../assets/serviceProviderFormImg.jpg'
import google from '../../assets/google.webp'


import { CountrySelect, StateSelect, CitySelect } from 'react-country-state-city'
import "react-country-state-city/dist/react-country-state-city.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const ServiceProviderSignUp = () => {

    const [step, setStep] = useState(0);
    const [countryid, setcountryid] = useState(0);
    const [stateid, setstateid] = useState(0);

    const [PhoneNumber, setPhoneNumber] = useState('');

    const handleChange =(value) =>{
        setPhoneNumber(value);
    };

    const nextStep = () => {
        if (step < 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1)
    };


  return (
    <div className="serviceProviderFormContainer">
        <img src={serviceproviderformimg} alt="" className='serviceProviderFormImg'/>
        <form className="signup_form_container">
            <div className="title_container">
                <p className="title">Register as a Service Provider</p>
                <span className="subtitle">Get started with our app, showcase your services, expand your reach, while getting paid.</span>
            </div>

            {step === 0 && (
                <div className='firstStep'>
                    <div className="input_container">
                        <label className="input_label" for="email_field">Firstname</label>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="#141B34" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" />
                        </svg>
                        <input placeholder="Tom" title="Inpit title" name="input-name" type="text" className="signup_input_field" id="email_field" required/>
                    </div>

                    <div className="input_container">
                        <label className="input_label" for="email_field">Lastname</label>
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


                        <input placeholder="Holland" title="Inpit title" name="input-name" type="text" className="signup_input_field" id="email_field" required/>
                    </div>

                    <div className="input_container">
                        <label className="input_label" for="email_field">Email</label>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                            <path stroke-linejoin="round" stroke-width="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                        </svg>
                        <input placeholder="name@mail.com" title="Inpit title" name="input-name" type="text" className="signup_input_field" id="email_field" required/>
                    </div>

                    <div className="input_container">
                        <label className="input_label" for="password_field">Password</label>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                            <path stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                            <path fill="#141B34" d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"></path>
                        </svg>
                        <input placeholder="Password" title="Input password" name="input-name" type="password" className="signup_input_field" id="password_field" required/>
                    </div>
                </div>
            
            )}

            {step === 1 && (
                <div className='lastStep'>
                    <div className="input_container" id='country'>
                        <label className="input_label" for="password_field">Select Country</label>
                        <CountrySelect 
                            onChange={(e) =>{
                                setcountryid(e.id);
                                console.log(e);  
                            }}
                            style={{border: "none", outline: "none"}}
                            // placeHolder='Select Country'
                            className="input_field"
                        />
                    </div>

                    <div className="input_container" id='state'>
                        <label className="input_label" for="password_field">Select State</label>
                        <StateSelect 
                            disabled={!countryid}
                            countryid={countryid}
                            onChange={(e) =>{
                                setstateid(e.id);
                                console.log(e);  
                            }}
                            style={{border: "none", outline: "none"}}
                            // placeHolder='Select State'
                            className='input_field'
                        />
                    </div>

                    <div className="input_container" id='state'>
                        <label className="input_label" for="password_field">Select City</label>
                        <CitySelect 
                            disabled={!stateid}
                            countryid={countryid}
                            stateid={stateid}
                            onChange={(e) =>{
                                console.log(e);  
                            }}
                            style={{border: "none", outline: "none"}}
                            // placeHolder='Select City'
                            className='input_field'
                        />
                    </div>
                
                    <div className="group" id='phoneNo'>
                        <label htmlFor="" >
                            {/* Phone Number: */}
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="NG" // Use the correct country code (e.g., "GB" for the UK)
                                value={PhoneNumber}
                                onChange={handleChange}  
                            />     
                        </label>     
                    </div>
                </div>
            )}

            <div className="prevNextButtons">
                    {step > 0 && (
                        <button type="button" onClick={prevStep}>
                            Previous
                        </button>
                    )}
                    {step < 1 && (
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    )}
            </div>

            {/* <a routerLink="/dashboard" className="sign-in_btnLink">
                <button title="Sign Up" type="submit" className="signUpBtn">
                    <span>Sign Up</span> 
                </button>
            </a> */}

            <button title="Sign Up" type="submit" className="signUpBtn">
                <span>Sign Up</span> 
            </button>

            <div className="separator">
                <hr className='line'/>
                <span>Or</span>
                <hr className="line"/>
            </div>

            <button title="Sign Up with Google" type="submit" className="sign-up_ggl">
                <img src={google} alt="" className='google'/>
                <span>Sign Up with Google</span>
            </button>
            {/* <button title="Sign In" type="submit" className="sign-in_apl">
            <svg preserveAspectRatio="xMidYMid" version="1.1" viewBox="0 0 256 315" height="20px" width="16px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
            <g>
            <path fill="#ffffff" d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"></path>
            </g>
            </svg>
            <span>Sign In with Apple</span>
            </button> */}
            <p className="note">
                Already have an account? 
                <Link to="/Login" className="logInBtnLink">Log In</Link>
            </p>
        </form>
    </div>
  )
}

export default ServiceProviderSignUp
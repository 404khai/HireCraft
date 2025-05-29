import React, {useState} from 'react'
import './Settings.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { TiFolderAdd } from "react-icons/ti";
import avatar from '../../assets/pacman.jpg'


import { CountrySelect, StateSelect, CitySelect } from 'react-country-state-city'
import "react-country-state-city/dist/react-country-state-city.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Settings = () => {
  const [countryid, setcountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  
  const [PhoneNumber, setPhoneNumber] = useState('');
  
  const handleChange =(value) =>{
    setPhoneNumber(value);
  };

  return (
    <div className='profileBox'>
      <DashboardNav/>
        <div className='profileBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
            <div className="dashboard">
                <div className="welcome">
                    <div className="welcomeTxt">
                        <h2>Settings</h2>
                    </div>

                    <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Settings" link2="/ProviderDashboard/Settings"/>
                </div>

                <div className="editProfileSettings">
                    <div className="editProfile">
                        <div className="editProfileHead">
                            <i><TiFolderAdd /></i>
                            <b>Edit Profile</b>
                        </div>

                        <div className="editPic">
                          <p><b>Avatar</b></p>
                          {/* <input type="week" /> */}
                          <img src={avatar} alt="" title='Change Avatar'/>
                        </div>

                        <div className="changeInfoForm">
                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Firstname</label>
                            <input placeholder="Tom" title="Change Firstname" type="text" className="changeInfoInput" required/>
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Lastname</label>
                            <input placeholder="Holland" title="Change Lastname" type="text" className="changeInfoInput" required/>
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Email</label>
                            <input placeholder="testhirecraft@gmail.com" title="Change Lastname" type="text" className="changeInfoInput" required/>
                          </div>

                          <div className="changePhoneNo" id='phoneNo'>
                            <label htmlFor="" >
                                <PhoneInput
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry="NG" // Use the correct country code (e.g., "GB" for the UK)
                                    value={PhoneNumber}
                                    onChange={handleChange}  
                                />     
                            </label>     
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Profession</label>
                            <input placeholder="Animator" title="Change Lastname" type="text" className="changeInfoInput" required/>
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Bio</label>
                            <textarea id="bio" name="bio"></textarea>
                            {/* <input placeholder="" id='bioChange' title="Change Lastname" type="text" className="changeInfoInput" required/> */}
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Skills</label>
                            <textarea id="skills" name="skills"></textarea>
                            {/* <input placeholder="" id='bioChange' title="Change Lastname" type="text" className="changeInfoInput" required/> */}
                          </div>

                          <div className="changeInfoInputContainer" id='country'>
                            <label className="changeInfoLabel" for="password_field">Select Country</label>
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

                          <div className="changeInfoInputContainer" id='state'>
                              <label className="changeInfoLabel" for="password_field">Select State</label>
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

                          <div className="changeInfoInputContainer" id='state'>
                              <label className="changeInfoLabel" for="password_field">Select City</label>
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

                          <button className='saveChanges'>Save Changes</button>
                        </div>
                        
                        
                    </div>


                    <div className="editPassword">
                      <div className="editProfileHead">
                        <i><TiFolderAdd /></i>
                        <b>Change Password</b>
                      </div>

                      <div className="changePasswordForm">
                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">Current Password</label>
                          <input title="Current Password" type="text" className="changeInfoInput" required/>
                        </div>

                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">New Password</label>
                          <input title="New Password" type="text" className="changeInfoInput" required/>
                        </div>

                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">Confirm New Password</label>
                          <input  title="Confirm New Password" type="text" className="changeInfoInput" required/>
                        </div>

                        <button className='saveChanges'>Save Changes</button>
                      </div>
                    </div>


                </div>

            </div>
        </div>
    </div>
  )
}


export default Settings
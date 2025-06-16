// import React, {useState, useContext, useEffect, useRef} from 'react'
// import './Settings.css'
// import DashboardNav from '../../components/DashboardNav/DashboardNav'
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
// import { TiFolderAdd } from "react-icons/ti";
// // import avatar from '../../assets/pacman.jpg'
// import defaultAvatar from '../../assets/userPic.png'

// import { CountrySelect, StateSelect, CitySelect } from 'react-country-state-city'
// import "react-country-state-city/dist/react-country-state-city.css";
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

// import { AuthContext } from '../../context/AuthContext'
// import { ToastContainer, toast, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Avatar from '../../components/Avatar'

// const Settings = () => {

//   const { user, setUser } = useContext(AuthContext);
//   const token = localStorage.getItem('token');

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const [occupation, setOccupation] = useState('');
//   const [hourlyRate, setHourlyRate] = useState('');
//   const [providerBio, setProviderBio] = useState('');
//   const [skills, setSkills] = useState('');
  
//   const [selectedCountryId, setSelectedCountryId] = useState(0);
//   const [selectedStateId, setSelectedStateId] = useState(0);
//   const [selectedCountryName, setSelectedCountryName] = useState('');
//   const [selectedStateName, setSelectedStateName] = useState('');
//   const [selectedCityName, setSelectedCityName] = useState('');

//   const [profilePictureUrl, setProfilePictureUrl] = useState(''); //

//   // const [countryid, setcountryid] = useState(0);
//   // const [stateid, setstateid] = useState(0);
  
//   // const [PhoneNumber, setPhoneNumber] = useState('');
  
//   // const handleChange =(value) =>{
//   //   setPhoneNumber(value);
//   // };

//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     if (user) {
//       setFirstName(user.firstName || '');
//       setLastName(user.lastName || '');
//       setEmail(user.email || '');
//       setPhoneNumber(user.phoneNumber || '');
//       setOccupation(user.occupation || '');
//       setHourlyRate(user.hourlyRate || '');
//       setProviderBio(user.providerBio || '');
//       setSkills(Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''));
//       setProfilePictureUrl(user.profilePictureUrl || profilePictureUrl);

//       setSelectedCountryName(user.country || '');
//       setSelectedStateName(user.state || '');
//       setSelectedCityName(user.city || '');
//     }
//   }, [user]);

//   // --- Handle saving changes ---
//   const handleSaveChanges = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     if (!token) {
//       toast.error('You are not authenticated. Please log in.', {
//         position: 'top-center',
//         autoClose: 2000,
//       });
//       return;
//     }

//     const payload = {
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       country: selectedCountryName, // Send the selected country name
//       state: selectedStateName,     // Send the selected state name
//       city: selectedCityName,       // Send the selected city name
      
//       companyName: null,
//       position: null,
//       profession: null,
//       companyWebsiteUrl: null,
//       clientBio: null,

//       // Service Provider specific fields
//       occupation,
//       providerBio,
//       cvUrl: null, 
//       skills: skills ? skills.split(',').map(s => s.trim()) : [],
//     };

//     try {
//       const response = await fetch('http://localhost:9090/api/v1/users/update-profile', {
//         method: 'PATCH', // Assuming PUT for updating a resource
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const updatedUserData = await response.json();
//         // Update the user context with the new data from the backend
//         setUser(updatedUserData);
//         toast.success('Profile updated successfully!', {
//           position: 'top-center',
//           autoClose: 1500,
//           transition: Bounce,
//         });
//       } 
//       else {
//         const errorData = await response.json();
//         toast.error(errorData.message || 'Failed to update profile', {
//           position: 'top-center',
//           autoClose: 2000,
//           transition: Bounce,
//         });
//         console.error('Update profile error:', errorData);
//       }
//     } catch (error) {
//       console.error('Network error during profile update:', error);
//       toast.error('An error occurred. Please try again.', {
//         position: 'top-center',
//         autoClose: 2000,
//         transition: Bounce,
//       });
//     }
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       handleUploadProfilePicture(file);
//     }
//   };

//   // --- Function to handle the actual upload to backend ---
//   const handleUploadProfilePicture = async (file) => {
//     if (!token) {
//       toast.error('You are not authenticated. Please log in.', { position: 'top-center', autoClose: 2000 });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file); // 'file' must match @RequestPart("file") in your Spring controller

//     toast.info('Uploading profile picture...', { position: 'top-center', autoClose: false, toastId: 'uploading' }); // Show loading toast

//     try {
//       const response = await fetch('http://localhost:9090/api/v1/users/update-profile-picture', {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           // 'Content-Type': 'multipart/form-data' is NOT set here.
//           // The browser sets it automatically with the correct boundary when FormData is used.
//         },
//         body: formData,
//       });

//       toast.dismiss('uploading'); // Dismiss loading toast

//       if (response.ok) {
//         const result = await response.json(); // This should be { "profilePictureUrl": "..." }
//         const newProfilePictureUrl = result.profilePictureUrl;

//         // Update local state for immediate display
//         setProfilePictureUrl(newProfilePictureUrl);

//         // Update AuthContext user object to reflect the new profile picture URL
//         setUser(prevUser => ({
//           ...prevUser,
//           profilePictureUrl: newProfilePictureUrl,
//         }));

//         toast.success('Profile picture updated successfully!', { position: 'top-center', autoClose: 1500, transition: Bounce });
//       } else {
//         const errorData = await response.json();
//         console.error('Profile picture upload error:', errorData);
//         toast.error(errorData.message || 'Failed to upload profile picture. Check console for details.', {
//           position: 'top-center',
//           autoClose: 3000,
//           transition: Bounce,
//         });
//       }
//     } catch (error) {
//       toast.dismiss('uploading');
//       console.error('Network error during profile picture upload:', error);
//       toast.error('An error occurred during image upload. Please try again.', { position: 'top-center', autoClose: 2000, transition: Bounce });
//     }
//   };

//   return (
//     <div className='profileBox'>
//       <DashboardNav/>
//         <div className='profileBody'>
//           <ProviderSideNav/>
//           {/* <EmployerSideNav/> */}
//             <div className="dashboard" id='settingsDash'>
//                 <div className="welcome">
//                     <div className="welcomeTxt">
//                         <h2>Settings</h2>
//                     </div>

//                     <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Settings" link2="/ProviderDashboard/Settings"/>
//                 </div>

//                 <div className="editProfileSettings">
//                     <div className="editProfile">
//                         <div className="editProfileHead">
//                             <i><TiFolderAdd /></i>
//                             <b>Edit Profile</b>
//                         </div>

//                         <div className="editPic">
//                           <p><b>Avatar</b></p>
//                           <img
//                             src={profilePictureUrl}
//                             alt="User Avatar"
//                             title='Click to Change Avatar'
//                             className='profilePic'
//                             onClick={() => fileInputRef.current.click()} // Programmatically click the hidden input
//                             style={{ cursor: 'pointer' }} // Add cursor for better UX
//                           />
//                           <input
//                             type="file"
//                             accept="image/*" // Only allow image files
//                             ref={fileInputRef} // Attach ref to the input
//                             onChange={handleProfilePictureChange} // Handle file selection
//                             style={{ display: 'none' }} // Hide the input visually
//                           />
//                         </div>

//                         <form className="changeInfoForm" onSubmit={handleSaveChanges}>
//                           <div className="changeInfoInputContainer">
//                             <label className="changeInfoLabel">Firstname</label>
//                             <input 
//                               value={firstName} 
//                               onChange={(e) => setFirstName(e.target.value)}
//                               title="Change Firstname" 
//                               type="text" 
//                               className="changeInfoInput" 
//                             />
//                           </div>

//                           <div className="changeInfoInputContainer">
//                             <label className="changeInfoLabel">Lastname</label>
//                             <input 
//                               value={lastName} 
//                               onChange={(e) => setLastName(e.target.value)}
//                               title="Change Lastname" 
//                               type="text" 
//                               className="changeInfoInput" 
//                             />
//                           </div>

//                           <div className="changeInfoInputContainer">
//                             <label className="changeInfoLabel">Email</label>
//                             <input 
//                               value={email} 
//                               onChange={(e) => setEmail(e.target.value)}
//                               title="Change Email" 
//                               type="email" 
//                               className="changeInfoInput" 
//                             />
//                           </div>

//                           <div className="changePhoneNo" id='phoneNo'>
//                             <label className="changeInfoLabel">Phone Number</label>
//                             <label htmlFor="" >
//                                 <PhoneInput
//                                     international
//                                     countryCallingCodeEditable={false}
//                                     defaultCountry="NG" // Use the correct country code (e.g., "GB" for the UK)
//                                     value={phoneNumber}
//                                     onChange={setPhoneNumber}  
//                                 />     
//                             </label>     
//                           </div>

//                           <div className="changeInfoInputContainer">
//                             <label className="changeInfoLabel">Occupation</label>
//                             <input 
//                               value={occupation}
//                               onChange={(e) => setOccupation(e.target.value)}
//                               title="Change Occupation"
//                               type="text"
//                               className="changeInfoInput"
//                             />
//                           </div>

//                           <div className="changeInfoInputContainer">
//                             <label className="changeInfoLabel">Bio</label>
//                             <textarea
//                               id="bio"
//                               name="bio"
//                               value={providerBio}
//                               onChange={(e) => setProviderBio(e.target.value)}
//                             ></textarea>
//                           </div>

//                           <div className="changeInfoInputContainer">
//                             <label className="changeInfoLabel">Skills</label>
//                             <textarea
//                               id="skills"
//                               name="skills"
//                               value={skills}
//                               onChange={(e) => setSkills(e.target.value)}
//                             ></textarea>
//                           </div>

//                           <div className="changeInfoInputContainer" id='country'>
//                             <label className="changeInfoLabel" for="password_field">Country</label>
//                             {/* <CountrySelect 
//                                 onChange={(e) =>{
//                                     setcountryid(e.id);
//                                     console.log(e);  
//                                 }}
//                                 style={{border: "none", outline: "none"}}
//                                 className="input_field"
//                             /> */}
//                             <CountrySelect
//                               onChange={(data) => {
//                                 setSelectedCountryId(data.id);
//                                 setSelectedCountryName(data.name); // Store the name
//                                 setSelectedStateId(0); // Reset state when country changes
//                                 setSelectedStateName('');
//                                 setSelectedCityName('');
//                                 console.log('Selected Country:', data);
//                               }}
//                               style={{ border: "none", outline: "none" }}
//                               placeHolder={selectedCountryName || 'Select Country'} // Display current name as placeholder
//                               className="input_field"
//                             />
//                           </div>

//                           <div className="changeInfoInputContainer" id='state'>
//                               <label className="changeInfoLabel" for="password_field">State</label>
//                               {/* <StateSelect 
//                                   disabled={!countryid}
//                                   countryid={countryid}
//                                   onChange={(e) =>{
//                                       setstateid(e.id);
//                                       console.log(e);  
//                                   }}
//                                   style={{border: "none", outline: "none"}}
//                                   // placeHolder='Select State'
//                                   className='input_field'
//                               /> */}
//                               <StateSelect
//                                 disabled={!selectedCountryId}
//                                 countryid={selectedCountryId}
//                                 onChange={(data) => {
//                                   setSelectedStateId(data.id);
//                                   setSelectedStateName(data.name); // Store the name
//                                   setSelectedCityName('');
//                                   console.log('Selected State:', data);
//                                 }}
//                                 style={{ border: "none", outline: "none" }}
//                                 placeHolder={selectedStateName || 'Select State'} // Display current name as placeholder
//                                 className='input_field'
//                               />
//                           </div>

//                           <div className="changeInfoInputContainer" id='state'>
//                               <label className="changeInfoLabel" for="password_field">City</label>
//                               {/* <CitySelect 
//                                   disabled={!stateid}
//                                   countryid={countryid}
//                                   stateid={stateid}
//                                   onChange={(e) =>{
//                                       console.log(e);  
//                                   }}
//                                   style={{border: "none", outline: "none"}}
//                                   // placeHolder='Select City'
//                                   className='input_field'
//                               /> */}
//                               <CitySelect
//                                 disabled={!selectedStateId}
//                                 countryid={selectedCountryId}
//                                 stateid={selectedStateId}
//                                 onChange={(data) => {
//                                   setSelectedCityName(data.name); // Store the name
//                                   console.log('Selected City:', data);
//                                 }}
//                                 style={{ border: "none", outline: "none" }}
//                                 placeHolder={selectedCityName || 'Select City'} // Display current name as placeholder
//                                 className='input_field'
//                               />
//                           </div>

//                           <button type='submit' className='saveChanges'>Save Changes</button>
//                         </form>
                        
                        
//                     </div>


//                     <div className="editPassword">
//                       <div className="editProfileHead">
//                         <i><TiFolderAdd /></i>
//                         <b>Change Password</b>
//                       </div>

//                       <div className="changePasswordForm">
//                         <div className="changeInfoInputContainer">
//                           <label className="changeInfoLabel">Current Password</label>
//                           <input title="Current Password" type="text" className="changeInfoInput" required/>
//                         </div>

//                         <div className="changeInfoInputContainer">
//                           <label className="changeInfoLabel">New Password</label>
//                           <input title="New Password" type="text" className="changeInfoInput" required/>
//                         </div>

//                         <div className="changeInfoInputContainer">
//                           <label className="changeInfoLabel">Confirm New Password</label>
//                           <input  title="Confirm New Password" type="text" className="changeInfoInput" required/>
//                         </div>

//                         <button className='saveChanges'>Save Changes</button>
//                       </div>
//                     </div>

//                     <div className="editSocials">
//                       <div className="editProfileHead">
//                         <i><TiFolderAdd /></i>
//                         <b>Change Additional Info</b>
//                       </div>

//                       <div className="changePasswordForm">
//                         <div className="changeInfoInputContainer">
//                           <label className="changeInfoLabel">Hourly Rate</label>
//                           <input 
//                             value={hourlyRate} 
//                             onChange={(e) => setHourlyRate(e.target.value)}
//                             title="Edit hourly rate" 
//                             type="number" 
//                             className="changeInfoInput" 
//                           />
//                         </div>

//                         <div className="changeInfoInputContainer">
//                           <label className="changeInfoLabel">Instagram</label>
//                           <input title="New Password" type="text" className="changeInfoInput" required/>
//                         </div>

//                         <div className="changeInfoInputContainer">
//                           <label className="changeInfoLabel">Facebook</label>
//                           <input  title="Confirm New Password" type="text" className="changeInfoInput" required/>
//                         </div>

//                         <button className='saveChanges'>Save Changes</button>
//                       </div>
//                     </div>

//                 </div>

//             </div>
//         </div>
//         <ToastContainer
//           position="top-center"
//           autoClose={1200}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick={false}
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="dark"
//           transition={Bounce}
//         />
//     </div>
//   )
// }


// export default Settings

import React, {useState, useContext, useEffect, useRef} from 'react'
import './Settings.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { TiFolderAdd } from "react-icons/ti";

import { CountrySelect, StateSelect, CitySelect } from 'react-country-state-city'
import "react-country-state-city/dist/react-country-state-city.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { AuthContext } from '../../context/AuthContext'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Avatar from '../../components/Avatar' // Ensure this path is correct

const Settings = () => {

  const { user, setUser } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [occupation, setOccupation] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [providerBio, setProviderBio] = useState('');
  const [skills, setSkills] = useState('');
  
  const [selectedCountryId, setSelectedCountryId] = useState(0);
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');

  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
      setOccupation(user.occupation || '');
      setHourlyRate(user.hourlyRate || '');
      setProviderBio(user.providerBio || '');
      setSkills(Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''));
      setProfilePictureUrl(user.profilePictureUrl || ''); // Use empty string if no URL

      setSelectedCountryName(user.country || '');
      setSelectedStateName(user.state || '');
      setSelectedCityName(user.city || '');
    }
  }, [user]);

  // --- Handle saving changes ---
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('You are not authenticated. Please log in.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      country: selectedCountryName,
      state: selectedStateName,
      city: selectedCityName,

      companyName: null,
      position: null,
      profession: null,
      companyWebsiteUrl: null,
      clientBio: null,

      occupation,
      providerBio,
      cvUrl: null, 
      skills: skills ? skills.split(',').map(s => s.trim()) : [],
    };

    try {
      const response = await fetch('http://localhost:9090/api/v1/users/update-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        toast.success('Profile updated successfully!', {
          position: 'top-center',
          autoClose: 1500,
          transition: Bounce,
        });
      } 
      else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to update profile', {
          position: 'top-center',
          autoClose: 2000,
          transition: Bounce,
        });
        console.error('Update profile error:', errorData);
      }
    } catch (error) {
      console.error('Network error during profile update:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadProfilePicture(file);
    }
  };

  // --- Function to handle the actual upload to backend ---
  const handleUploadProfilePicture = async (file) => {
    if (!token) {
      toast.error('You are not authenticated. Please log in.', { position: 'top-center', autoClose: 2000 });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    toast.info('Uploading profile picture...', { position: 'top-center', autoClose: false, toastId: 'uploading' });

    try {
      const response = await fetch('http://localhost:9090/api/v1/users/update-profile-picture', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      toast.dismiss('uploading');

      if (response.ok) {
        const result = await response.json();
        const newProfilePictureUrl = result.profilePictureUrl;

        setProfilePictureUrl(newProfilePictureUrl);

        setUser(prevUser => ({
          ...prevUser,
          profilePictureUrl: newProfilePictureUrl,
        }));

        toast.success('Profile picture updated successfully!', { position: 'top-center', autoClose: 1500, transition: Bounce });
      } else {
        const errorData = await response.json();
        console.error('Profile picture upload error:', errorData);
        toast.error(errorData.message || 'Failed to upload profile picture. Check console for details.', {
          position: 'top-center',
          autoClose: 3000,
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.dismiss('uploading');
      console.error('Network error during profile picture upload:', error);
      toast.error('An error occurred during image upload. Please try again.', { position: 'top-center', autoClose: 2000, transition: Bounce });
    }
  };

  return (
    <div className='profileBox'>
      <DashboardNav/>
        <div className='profileBody'>
          <ProviderSideNav/>
            <div className="dashboard" id='settingsDash'>
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
                          {/* Use the Avatar component here */}
                          <Avatar
                            imageUrl={profilePictureUrl} // Pass the profilePictureUrl from state
                            firstName={firstName}
                            lastName={lastName}
                            size={130} // Adjust size as needed
                            textSize={40} // Adjust text size for initials
                            className='editPicImg' // Add your existing CSS class for extra styling
                            onClick={() => fileInputRef.current.click()} // Keep click behavior
                          />
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleProfilePictureChange}
                            style={{ display: 'none' }}
                          />
                        </div>

                        <form className="changeInfoForm" onSubmit={handleSaveChanges}>
                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Firstname</label>
                            <input 
                              value={firstName} 
                              onChange={(e) => setFirstName(e.target.value)}
                              title="Change Firstname" 
                              type="text" 
                              className="changeInfoInput" 
                            />
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Lastname</label>
                            <input 
                              value={lastName} 
                              onChange={(e) => setLastName(e.target.value)}
                              title="Change Lastname" 
                              type="text" 
                              className="changeInfoInput" 
                            />
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Email</label>
                            <input 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                              title="Change Email" 
                              type="email" 
                              className="changeInfoInput" 
                            />
                          </div>

                          <div className="changePhoneNo" id='phoneNo'>
                            <label className="changeInfoLabel">Phone Number</label>
                            <label htmlFor="" >
                                <PhoneInput
                                  international
                                  countryCallingCodeEditable={false}
                                  defaultCountry="NG"
                                  value={phoneNumber}
                                  onChange={setPhoneNumber}
                                />
                            </label>
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Occupation</label>
                            <input 
                              value={occupation}
                              onChange={(e) => setOccupation(e.target.value)}
                              title="Change Occupation"
                              type="text"
                              className="changeInfoInput"
                            />
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Bio</label>
                            <textarea
                              id="bio"
                              name="bio"
                              value={providerBio}
                              onChange={(e) => setProviderBio(e.target.value)}
                            ></textarea>
                          </div>

                          <div className="changeInfoInputContainer">
                            <label className="changeInfoLabel">Skills</label>
                            <textarea
                              id="skills"
                              name="skills"
                              value={skills}
                              onChange={(e) => setSkills(e.target.value)}
                            ></textarea>
                          </div>

                          <div className="changeInfoInputContainer" id='country'>
                            <label className="changeInfoLabel" htmlFor="password_field">Country</label>
                            <CountrySelect
                              onChange={(data) => {
                                setSelectedCountryId(data.id);
                                setSelectedCountryName(data.name);
                                setSelectedStateId(0);
                                setSelectedStateName('');
                                setSelectedCityName('');
                                console.log('Selected Country:', data);
                              }}
                              style={{ border: "none", outline: "none" }}
                              placeHolder={selectedCountryName || 'Select Country'}
                              className="input_field"
                            />
                          </div>

                          <div className="changeInfoInputContainer" id='state'>
                              <label className="changeInfoLabel" htmlFor="password_field">State</label>
                              <StateSelect
                                disabled={!selectedCountryId}
                                countryid={selectedCountryId}
                                onChange={(data) => {
                                  setSelectedStateId(data.id);
                                  setSelectedStateName(data.name);
                                  setSelectedCityName('');
                                  console.log('Selected State:', data);
                                }}
                                style={{ border: "none", outline: "none" }}
                                placeHolder={selectedStateName || 'Select State'}
                                className='input_field'
                              />
                          </div>

                          <div className="changeInfoInputContainer" id='state'>
                              <label className="changeInfoLabel" htmlFor="password_field">City</label>
                              <CitySelect
                                disabled={!selectedStateId}
                                countryid={selectedCountryId}
                                stateid={selectedStateId}
                                onChange={(data) => {
                                  setSelectedCityName(data.name);
                                  console.log('Selected City:', data);
                                }}
                                style={{ border: "none", outline: "none" }}
                                placeHolder={selectedCityName || 'Select City'}
                                className='input_field'
                              />
                          </div>

                          <button type='submit' className='saveChanges'>Save Changes</button>
                        </form>
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

                    <div className="editSocials">
                      <div className="editProfileHead">
                        <i><TiFolderAdd /></i>
                        <b>Change Additional Info</b>
                      </div>

                      <div className="changePasswordForm">
                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">Hourly Rate</label>
                          <input 
                            value={hourlyRate} 
                            onChange={(e) => setHourlyRate(e.target.value)}
                            title="Edit hourly rate" 
                            type="number" 
                            className="changeInfoInput" 
                          />
                        </div>

                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">Instagram</label>
                          <input title="New Password" type="text" className="changeInfoInput" required/>
                        </div>

                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">Facebook</label>
                          <input  title="Confirm New Password" type="text" className="changeInfoInput" required/>
                        </div>

                        <button className='saveChanges'>Save Changes</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
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
    </div>
  )
}

export default Settings
import React, {useState, useContext, useEffect, useRef} from 'react'
import './Settings.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { TiFolderAdd } from "react-icons/ti";
import { LuScanText, LuFolderCog } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

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
  const [cvUrl, setCvUrl] = useState('');
  const [selectedCvFile, setSelectedCvFile] = useState(null);

  const [jobTitle, setJobTitle] = useState('');

  const [selectedCountryId, setSelectedCountryId] = useState(0);
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');

  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const fileInputRef = useRef(null);
  const cvFileInputRef = useRef(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
      setOccupation(user.occupation || '');
      setHourlyRate(user.hourlyRate || '');
      setProviderBio(user.providerBio || '');
      setJobTitle(user.jobTitle || '');
      setSkills(Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''));
      setProfilePictureUrl(user.profilePictureUrl || ''); // Use empty string if no URL
      setCvUrl(user.cvUrl || '');
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

      jobTitle: null,

      occupation,
      providerBio,
      hourlyRate,
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

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('You are not authenticated. Please log in.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    // Client-side validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error('All password fields are required.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    if (newPassword.length < 4) {
      toast.error('New password must be at least 4 characters long.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };

    try {
      const response = await fetch('http://localhost:9090/api/v1/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Password changed successfully!', {
          position: 'top-center',
          autoClose: 1500,
          transition: Bounce,
        });
        
        // Clear password fields after successful change
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } 
      else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to change password', {
          position: 'top-center',
          autoClose: 2000,
          transition: Bounce,
        });
        console.error('Change password error:', errorData);
      }
    } catch (error) {
      console.error('Network error during password change:', error);
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

  const handleCvFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedCvFile(file); // Store the file for preview/display name
            handleUploadCv(file); // Automatically upload the CV when selected
        }
    };

    const handleUploadCv = async (file) => {
        if (!token) {
            toast.error('You are not authenticated. Please log in.', { position: 'top-center', autoClose: 2000 });
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // 'file' must match @RequestPart("file") in your Spring controller

        toast.info('Uploading CV...', { position: 'top-center', autoClose: false, toastId: 'uploading-cv' });

        try {
            const response = await fetch('http://localhost:9090/api/v1/users/upload-cv', {
                method: 'POST', // Assuming PATCH as per your backend
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            toast.dismiss('uploading-cv');

            if (response.ok) {
                const newCvUrl = await response.text(); // Assuming backend returns plain URL string
                setCvUrl(newCvUrl); // Update local state
                setUser(prevUser => ({
                    ...prevUser,
                    // Assuming cvUrl is directly on the user object or nested within serviceProviderProfile
                    // Adjust this based on your UserDetailResponse structure
                    serviceProviderProfile: {
                        ...prevUser.serviceProviderProfile,
                        cvUrl: newCvUrl
                    }
                }));
                toast.success('CV uploaded successfully!', { position: 'top-center', autoClose: 1500, transition: Bounce });
            } else {
                const errorData = await response.json();
                console.error('CV upload error:', errorData);
                toast.error(errorData.message || 'Failed to upload CV. Check console for details.', {
                    position: 'top-center',
                    autoClose: 3000,
                    transition: Bounce,
                });
            }
        } catch (error) {
            toast.dismiss('uploading-cv');
            console.error('Network error during CV upload:', error);
            toast.error('An error occurred during CV upload. Please try again.', { position: 'top-center', autoClose: 2000, transition: Bounce });
        }
    };

  return (
    <div className='profileBox'>
      <DashboardNav/>
        <div className='profileBody'>
          <ProviderSideNav/>
            <div className="settingsDashboard" id='settingsDash'>
                <div className="welcome">
                    <div className="welcomeTxt">
                        <h2>Settings</h2>
                    </div>

                    <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Settings" link2="/ProviderDashboard/Settings"/>
                </div>

                <div className="editProfileSettings">
                    <div className="editProfile">
                        <div className="editProfileHead">
                            {/* <i><IoSettingsOutline /></i> */}
                            <i><LuFolderCog /></i>
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

                          {user && user.userRole === 'ROLE_CLIENT' && (
                            <div className="changeInfoInputContainer">
                              <label className="changeInfoLabel">Job Title</label>
                              <input 
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                title="Change Job Title"
                                type="text"
                                className="changeInfoInput"
                              />
                            </div>
                          )}

                          {user && user.userRole === 'ROLE_PROVIDER' && (
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
                          )}

                          {user && user.userRole === 'ROLE_PROVIDER' && (
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
                          )}

                          {user && user.userRole === 'ROLE_PROVIDER' && (
                            <div className="changeInfoInputContainer">
                              <label className="changeInfoLabel">Bio</label>
                              <textarea
                                id="bio"
                                name="bio"
                                value={providerBio}
                                onChange={(e) => setProviderBio(e.target.value)}
                              ></textarea>
                            </div>
                          )}

                          {user && user.userRole === 'ROLE_PROVIDER' && (
                            <div className="changeInfoInputContainer">
                              <label className="changeInfoLabel">Skills</label>
                              <textarea
                                id="skills"
                                name="skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                              ></textarea>
                            </div>
                          )}

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
                        <i><LuFolderCog /></i>
                        <b>Change Password</b>
                      </div>

                      <form className="changePasswordForm" onSubmit={handleChangePassword}>
                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">Current Password</label>
                          <input 
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            title="Current Password" 
                            type="password" 
                            className="changeInfoInput" 
                            required
                          />
                        </div>

                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">New Password</label>
                          <input 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            title="New Password" 
                            type="password" 
                            className="changeInfoInput" 
                            required
                            minLength={4}
                          />
                        </div>

                        <div className="changeInfoInputContainer">
                          <label className="changeInfoLabel">Confirm New Password</label>
                          <input 
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            title="Confirm New Password" 
                            type="password" 
                            className="changeInfoInput" 
                            required
                            minLength={4}
                          />
                        </div>

                        <button type='submit' className='saveChanges'>Change Password</button>
                      </form>
                    </div>

                    

                    {/* <div className="cvFile">
                      <p>My-CV.pdf</p>
                      <p>pdf</p>
                    </div> */}

                    {user && user.userRole === 'ROLE_PROVIDER' && (
                    <div className="editCV">
                      <div className="editProfileHead">
                        <i><LuFolderCog /></i>
                        <b>Upload CV</b>
                      </div>

                      <div className="changePasswordForm">
                        
                        <div className="changeInfoInputContainer">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx" // Accept only PDF and Word documents
                              ref={cvFileInputRef}
                              onChange={handleCvFileChange}
                              style={{ display: 'none' }}
                            />
                            <div className='cvControls'>
                              <button
                                type="button" // Important: type="button" to prevent form submission
                                onClick={() => cvFileInputRef.current.click()}
                                className="uploadCvButton" // Add a class for styling
                                >
                                  {selectedCvFile ? `Selected: ${selectedCvFile.name}` : (cvUrl ? "Change CV" : "Upload CV")}
                              </button>

                              <a href={cvUrl} target="_blank" rel="noopener noreferrer">View CV <LuScanText/></a>
                            </div>
                            
                            {cvUrl && (
                              <div className="cvOverview">
                                {/* <div className="cvFile">
                                  <p><a href={cvUrl} target="_blank" rel="noopener noreferrer">View CV</a></p>
                                  <p>pdf</p>
                                </div> */}
                                {cvUrl.toLowerCase().endsWith('.pdf') && (
                                  <iframe src={cvUrl} width="100%" height="300px" title="CV Preview" style={{ border: '1px solid #ccc', marginTop: '10px' }}></iframe>
                                )}
                              </div>
                            )}
                          </div>
                        
                      </div>
                    </div>
                    )}

                      
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
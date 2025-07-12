import React, { useState } from 'react';
import '../styles/Profile.css';
import { HashLoader } from 'react-spinners';
import Notification from '../components/Notification'; // Import the Notification component
import SidebarNavigation from '../components/SidebarNavigation';
import BasicProfileDetails from '../components/profile/BasicProfileDetails';
import AddressDetails from '../components/profile/AddressDetails';
import ProfileSection from '../components/profile/ProfileSection'; // Keep for Personal Info
import ParentDetailsSection from '../components/profile/ParentDetailsSection'; // New import
import PasswordChangeForm from '../components/profile/PasswordChangeForm';
import LoadingSpinner from '../components/LoadingSpinner';
import useProfileData from '../hooks/useProfileData';
import { updateProfileDetails } from '../services/student';
import { changePassword } from '../services/auth';

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null); // State to manage notification visibility and content

  const {
    profileData,
    setProfileData,
    formData,
    setFormData,
    isLoading,
    // Removed error and setError as Notification component will handle error display
  } = useProfileData(activeSection);

  // Helper function to display a notification
  const showNotification = (from, message, statusCode, duration = 5000) => {
    setNotification({ from, message, statusCode, duration });
  };

  // Callback to clear the notification (passed to Notification component)
  const clearNotification = () => {
    setNotification(null);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Removed setError('')
    setIsEditing(false);
    setFormData({ oldPassword: '', newPassword: '', reEnterNewPassword: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (activeSection === 'password') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = async () => {
    if (activeSection === 'password') return;

    // Removed setError('')
    try {
      await updateProfileDetails(profileData);
      setIsEditing(false);
      showNotification('Profile Update', 'Profile updated successfully!', 200); // Show success notification
    } catch (err) {
      console.error('Error updating profile:', err);
      // Show error notification
      showNotification('Profile Update', 'Failed to update profile.', 500); 
    }
  };

  const handleChangePassword = async () => {
    // Removed setError('')
    try {
      const result = await changePassword(formData);
      console.log("Password Change Result:", result);
      if (result.success) {
        showNotification('Password Change', result.message, 200); // Show success notification
        setFormData({ oldPassword: '', newPassword: '', reEnterNewPassword: '' });
      } else {
        // Assuming result.message contains the error for client-side validation (e.g., passwords don't match)
        showNotification('Password Change', result.message, 400); // Show warning/error notification
      }
    } catch (err) {
      console.error('Error changing password in component:', err);
      // Show error notification for API errors
      showNotification('Password Change', err.toString() || 'An unexpected error occurred.', 500);
    }
  };

  return (
    <div className="profile-main-container">
      <button className='home-btn'>Home</button>
      <SidebarNavigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <div className="profile-right-side-container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="profile-right-side-container-content">
            {/* Removed {error && <p className="profile-error">{error}</p>} */}

            {activeSection === 'profile' && (
              <>
                <BasicProfileDetails
                  profileData={profileData}
                  handleInputChange={handleInputChange}
                  isEditing={isEditing}
                />
                <AddressDetails
                  profileData={profileData}
                  handleInputChange={handleInputChange}
                  isEditing={isEditing}
                />
                <div className="update-button-div">
                  {isEditing ? (
                    <>
                      <button className="update-button" onClick={handleSaveChanges} disabled={isLoading}>
                        Save Changes
                      </button>
                      <button
                        className="update-button"
                        onClick={() => setIsEditing(false)}
                        style={{ marginLeft: '10px' }}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="update-button" onClick={() => setIsEditing(true)} disabled={isLoading}>
                      Update Details
                    </button>
                  )}
                </div>
              </>
            )}

            {activeSection === 'personal' && (
              <ProfileSection
                title="Personal Information"
                profileData={profileData}
                handleInputChange={handleInputChange}
                isEditing={isEditing}
                onSave={handleSaveChanges}
                onEditToggle={setIsEditing}
                fields={[
                  { label: 'Personal Email', name: 'profileEmail', type: 'email' },
                  { label: 'Personal Phone', name: 'profilePhone', type: 'tel' },
                ]}
              />
            )}

            {/* Changed to use ParentDetailsSection */}
            {activeSection === 'parent' && (
              <ParentDetailsSection
                profileData={profileData}
                handleInputChange={handleInputChange}
                isEditing={isEditing}
                onSave={handleSaveChanges}
                onEditToggle={setIsEditing}
              />
            )}

            {activeSection === 'password' && (
              <PasswordChangeForm
                formData={formData}
                onInputChange={handleInputChange}
                onPasswordChange={handleChangePassword}
              />
            )}
          </div>
        )}
      </div>

      {notification && (
        <Notification
          from={notification.from}
          message={notification.message}
          statusCode={notification.statusCode}
          duration={notification.duration}
          onClose={clearNotification}
        />
      )}
    </div>
  );
}

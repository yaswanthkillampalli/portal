import React, { useState } from 'react';
import '../styles/Profile.css';
import { HashLoader } from 'react-spinners';
import SidebarNavigation from '../components/SidebarNavigation';
import BasicProfileDetails from '../components/profile/BasicProfileDetails';
import AddressDetails from '../components/profile/AddressDetails';
import ProfileSection from '../components/profile/ProfileSection'; // Keep for Personal Info
import ParentDetailsSection from '../components/profile/ParentDetailsSection'; // New import
import PasswordChangeForm from '../components/profile/PasswordChangeForm';
import LoadingSpinner from '../components/LoadingSpinner';
import useProfileData from '../hooks/useProfileData';
import { updateProfileDetails } from '../services/student';

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const {
    profileData,
    setProfileData,
    formData,
    setFormData,
    isLoading,
    error,
    setError,
  } = useProfileData(activeSection);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setError('');
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
    // This is for 'profile', 'personal', and 'parent' sections
    if (activeSection === 'password') return; // Password change handled separately

    setError('');
    try {
      await updateProfileDetails(profileData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  return (
    <div className="profile-main-container">
      <SidebarNavigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <div className="profile-right-side-container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="profile-right-side-container-content">
            {error && <p className="profile-error">{error}</p>}

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
                onPasswordChange={(passwordFormData) => {
                  const { oldPassword, newPassword, reEnterNewPassword } = passwordFormData;
                  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
                  if (!passwordRegex.test(newPassword)) {
                    setError('New password must be at least 8 characters long and include one digit, one capital letter, and one special character.');
                    return;
                  }
                  if (newPassword !== reEnterNewPassword) {
                    setError('New password and re-entered password do not match.');
                    return;
                  }
                  alert('Password change successful! (Simulated)');
                  setFormData({ oldPassword: '', newPassword: '', reEnterNewPassword: '' });
                  setError('');
                }}
                error={error}
                setError={setError}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
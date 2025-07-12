import React from 'react';
import ProfileInputField from './ProfileInputField'; 
import ProfileImageUploader from './ProfileImageUploader';


export default function BasicProfileDetails({ profileData, handleInputChange, isEditing, onProfileImageUpdate, userId }) {
  return (
    <div className="profile-right-side-content">
      <div className="profile-right-side-image-container">
        <ProfileImageUploader
          currentImageUrl={profileData.profileImage} // Pass the current image URL
          userId={userId} // Pass the user ID for API calls
          isEditing={isEditing} // Control whether the uploader is enabled
          onImageUploadSuccess={onProfileImageUpdate} // Callback to update parent's profileImage state
        />

        <div className="profile-right-size-text">
          <div className="profile-d-flex-items">
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="First Name:"
                name="profileFirstName"
                type="text"
                value={profileData.profileFirstName || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="Last Name:"
                name="profileLastName"
                type="text"
                value={profileData.profileLastName || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="profile-d-flex-items">
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="DOB:"
                name="profileDOB"
                type="date"
                value={profileData.profileDOB || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="Gender:"
                name="profileGender"
                type="text"
                value={profileData.profileGender || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="profile-d-flex-items">
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="Enrollment Date:"
                name="profileEnrollmentDate"
                type="date"
                value={profileData.profileEnrollmentDate || ''}
                onChange={handleInputChange}
                readOnly={true}
              />
            </div>
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="Program:"
                name="profileProgram"
                type="text"
                value={profileData.profileProgram || ''}
                onChange={handleInputChange}
                readOnly={true}
              />
            </div>
          </div>
          <div className="profile-d-flex-items">
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="Branch:"
                name="profileBranch"
                type="text"
                value={profileData.profileBranch || ''}
                onChange={handleInputChange}
                readOnly={true}
              />
            </div>
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="Semester:"
                name="profileSemester"
                type="text"
                value={profileData.profileSemester || ''}
                onChange={handleInputChange}
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
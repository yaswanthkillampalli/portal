import React from 'react';
import ProfileInputField from './ProfileInputField';

export default function BasicProfileDetails({ profileData, handleInputChange, isEditing }) {
  return (
    <div className="profile-right-side-content">
      <div className="profile-right-side-image-container">
        <div className="profile-right-side-image">
          <img
            src={profileData.profileImage}
            alt="Profile"
            className="profile-image-settings"
          />
        </div>
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
                readOnly={!isEditing}
              />
            </div>
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="Program:"
                name="profileProgram"
                type="text"
                value={profileData.profileProgram || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
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
                readOnly={!isEditing}
              />
            </div>
            <div className="profile-d-flex-item">
              <ProfileInputField
                label="Semester:"
                name="profileSemester"
                type="text"
                value={profileData.profileSemester || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
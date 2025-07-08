import React from 'react';
import ProfileInputField from './ProfileInputField';

export default function ParentDetailsSection({ profileData, handleInputChange, isEditing, onSave, onEditToggle }) {
  return (
    <div className="profile-right-side-content">
      <div className="profile-right-size-text">
        <h3>Relation 1</h3>
        <div className="profile-d-flex-items">
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Relation:"
              name="profileFatherRelation"
              type="text"
              value={profileData.profileFatherRelation || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="First Name:"
              name="profileFatherFirstName"
              type="text"
              value={profileData.profileFatherFirstName || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Last Name:"
              name="profileFatherLastName"
              type="text"
              value={profileData.profileFatherLastName || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
        <div className="profile-d-flex-items">
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Email:"
              name="profileFatherEmail"
              type="email"
              value={profileData.profileFatherEmail || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Phone:"
              name="profileFatherPhone"
              type="tel"
              value={profileData.profileFatherPhone || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
        <h3>Relation 2</h3>
        <div className="profile-d-flex-items">
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Relation:"
              name="profileMotherRelation"
              type="text"
              value={profileData.profileMotherRelation || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="First Name:"
              name="profileMotherFirstName"
              type="text"
              value={profileData.profileMotherFirstName || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Last Name:"
              name="profileMotherLastName"
              type="text"
              value={profileData.profileMotherLastName || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
        <div className="profile-d-flex-items">
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Email:"
              name="profileMotherEmail"
              type="email"
              value={profileData.profileMotherEmail || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Phone:"
              name="profileMotherPhone"
              type="tel"
              value={profileData.profileMotherPhone || ''}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>
      <div className="update-button-div">
        {isEditing ? (
          <>
            <button className="update-button" onClick={onSave} disabled={isLoading}>
              Save Changes
            </button>
            <button
              className="update-button"
              onClick={() => onEditToggle(false)}
              style={{ marginLeft: '10px' }}
              disabled={isLoading}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="update-button" onClick={() => onEditToggle(true)} >
            Update Details
          </button>
        )}
      </div>
    </div>
  );
}
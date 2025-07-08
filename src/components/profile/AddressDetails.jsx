import React from 'react';
import ProfileInputField from './ProfileInputField';

export default function AddressDetails({ profileData, handleInputChange, isEditing }) {
  return (
    <div className="profile-right-side-address-container">
      <div className="profile-d-flex-items">
        <div className="profile-d-flex-item">
          <ProfileInputField
            label="Street:"
            name="profileStreet"
            type="text"
            value={profileData.profileStreet || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="profile-d-flex-item">
          <ProfileInputField
            label="Village:"
            name="profileVillage"
            type="text"
            value={profileData.profileVillage || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="profile-d-flex-item">
          <ProfileInputField
            label="Mandal:"
            name="profileMandal"
            type="text"
            value={profileData.profileMandal || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
      <div className="profile-d-flex-items">
        <div className="profile-d-flex-item">
          <ProfileInputField
            label="City:"
            name="profileCity"
            type="text"
            value={profileData.profileCity || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="profile-d-flex-item">
          <ProfileInputField
            label="State:"
            name="profileState"
            type="text"
            value={profileData.profileState || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="profile-d-flex-item">
          <ProfileInputField
            label="Zipcode:"
            name="profileZipcode"
            type="text"
            value={profileData.profileZipcode || ''}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}
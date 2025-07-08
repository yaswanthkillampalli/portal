import React from 'react';
import ProfileInputField from './ProfileInputField';

export default function ProfileSection({
  title,
  profileData,
  handleInputChange,
  isEditing,
  onSave,
  onEditToggle,
  fields,
}) {
  return (
    <div className="profile-right-side-content">
      {title && <h2>{title}</h2>}
      <div className="profile-right-size-text">
        <div className="profile-d-flex-items">
          {fields.map((field, index) => (
            <React.Fragment key={field.name}>
              <div className="profile-d-flex-item">
                <ProfileInputField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={profileData[field.name] || ''}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              {field.separator && (
                <div style={{ width: '100%', borderBottom: '1px solid #eee', margin: '20px 0' }}>
                  <h3>Relation 2</h3>
                </div>
              )}
              {(index + 1) % 2 === 0 && index !== fields.length - 1 && (
                <div style={{ width: '100%' }} /> // Clearfix for flex items every two
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="update-button-div">
        {isEditing ? (
          <>
            <button className="update-button" onClick={onSave}>
              Save Changes
            </button>
            <button
              className="update-button"
              onClick={() => onEditToggle(false)}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="update-button" onClick={() => onEditToggle(true)}>
            Update Details
          </button>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import ProfileInputField from './ProfileInputField'; // Assuming you have a Notification component for displaying messages
export default function PasswordChangeForm({ formData, onInputChange, onPasswordChange, error, setError }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordChange(formData); // Pass formData to the parent handler
  };

  return (
    <div className="profile-right-side-content">
      <h2>Change Password</h2>
      <div className="profile-right-size-text">
        <form onSubmit={handleSubmit}>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Old Password:"
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="New Password:"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="profile-d-flex-item">
            <ProfileInputField
              label="Re-enter New Password:"
              name="reEnterNewPassword"
              type="password"
              value={formData.reEnterNewPassword}
              onChange={onInputChange}
              required
            />
          </div>
          {error && <p className="profile-error">{error}</p>}
          <button type="submit" className="profile-submit-button">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
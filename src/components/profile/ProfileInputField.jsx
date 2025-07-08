import React from 'react';

export default function ProfileInputField({ label, name, type, value, onChange, readOnly, required = false }) {
  return (
    <>
      <label className="profile-label">{label}</label>
      <input
        type={type}
        name={name}
        className="profile-input"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
      />
    </>
  );
}
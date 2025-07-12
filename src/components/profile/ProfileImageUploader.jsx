import React, { useState, useEffect, useRef } from 'react';
import { uploadProfilePicture } from '../../services/uploads';
import LoadingSpinnerSmall from '../LoadingSpinnerSmall';
import '../../styles/ProfileImageUploader.css';
import Notification from '../Notification'; // Assuming Notification is in the same directory or adjust path

const ProfileImageUploader = ({ currentImageUrl, userId, isEditing, onImageUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [notification, setNotification] = useState(null);

  const showNotification = (from, message, statusCode, duration = 5000) => {
    setNotification({ from, message, statusCode, duration });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      clearNotification(); // Clear any previous notification when a new file is selected
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleChangeDpClick = () => {
    // This condition `if (true)` can probably be removed or replaced with actual logic if needed
    if (true) {
      fileInputRef.current.click();
    }
  };

  const handleSaveImage = async () => {
    if (!selectedFile) {
      showNotification('Image Upload', 'No file selected for upload.', 400); 
      return;
    }
    
    setUploadLoading(true);
    clearNotification();

    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const data = await uploadProfilePicture(formData, userId);

      // Show success notification
      showNotification('Image Upload', 'Profile picture updated successfully!', 200); 
      setSelectedFile(null);
      setPreviewUrl(null); // Clear preview after successful upload

      if (onImageUploadSuccess) {
        onImageUploadSuccess(data.profileImageUrl);
      }

    } catch (error) {
      console.error('Error uploading profile picture:', error);
      // Show error notification
      showNotification(
        'Image Upload Failed',
        `Upload failed: ${error.response?.data?.message || error.message || 'Server error'}`,
        500 // Assuming server errors are 500 level
      );
    } finally {
      setUploadLoading(false);
    }
  };

  const handleCancelImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    // Show cancellation notification
    showNotification('Image Upload', 'Image upload cancelled.', 100); // Using 100 for info status
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }
  };

  return (
    <div className="profile-image-uploader-container">
      {/* Conditional rendering for the spinner */}
      {uploadLoading ? (
        <div className="spinner-overlay">
          <LoadingSpinnerSmall />
        </div>
      ) : (
        <>
          <img
            src={previewUrl || currentImageUrl || 'https://res.cloudinary.com/dz7moyhci/image/upload/v1752079251/default-image_o28ui6.jpg'}
            alt="Profile"
            className="profile-image-display"
          />
          {!isEditing && ( // Only show change button if not in general profile editing mode
            <button
              className='profile-image-change-button'
              onClick={handleChangeDpClick}
              disabled={uploadLoading}
            >
              Change Image
            </button>
          )}
        </>
      )}

      {/* Hidden file input always present */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />

      {/* Save/Cancel buttons */}
      {selectedFile && !isEditing && ( // Only show if a file is selected and not in general profile editing mode
        <div className="image-action-buttons">
          <button onClick={handleSaveImage} disabled={uploadLoading}>
            {uploadLoading ? 'Uploading...' : 'Save Image'}
          </button>
          <button onClick={handleCancelImage} disabled={uploadLoading}>
            Cancel
          </button>
        </div>
      )}

      {/* Notification component */}
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
};

export default ProfileImageUploader;

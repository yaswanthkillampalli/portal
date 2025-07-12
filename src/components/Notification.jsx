import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // For the close button
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa'; // For status emojis
import '../styles/Notification.css';

// Main Notification component
const Notification = ({ from, message, statusCode, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility for animation
  const timerRef = useRef(null); // Ref to hold the timeout ID

  // Determine CSS class and icon based on status code
  const getStatusProps = (code) => {
    if (code >= 200 && code < 300) {
      return {
        className: 'notification-success',
        icon: <FaCheckCircle className="notification-icon-success" />,
      };
    } else if (code >= 400 && code < 500) {
      return {
        className: 'notification-warning',
        icon: <FaExclamationTriangle className="notification-icon-warning" />,
      };
    } else if (code >= 500) {
      return {
        className: 'notification-error',
        icon: <FaTimesCircle className="notification-icon-error" />,
      };
    } else {
      // Default for info or other codes
      return {
        className: 'notification-info',
        icon: <FaInfoCircle className="notification-icon-info" />,
      };
    }
  };

  const { className: statusClassName, icon } = getStatusProps(statusCode);

  // Effect for showing the notification and setting the auto-hide timer
  useEffect(() => {
    // Show the notification with a slight delay for the "pop" effect
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // Small delay to allow CSS transition to apply

    // Set the timer to auto-hide the notification
    timerRef.current = setTimeout(() => {
      handleClose();
    }, duration);

    // Cleanup function: clear timers when component unmounts or dependencies change
    return () => {
      clearTimeout(showTimer);
      clearTimeout(timerRef.current);
    };
  }, [duration]); // Re-run if duration changes

  // Function to handle closing the notification
  const handleClose = () => {
    setIsVisible(false); // Trigger fade-out animation
    clearTimeout(timerRef.current); // Clear auto-hide timer if manually closed
    // Call the parent's onClose callback after the animation completes
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <div
      className={`notification-container ${statusClassName} ${isVisible ? 'is-visible' : 'is-hidden'}`}
      role="alert"
    >
      <div className="notification-content">
        {/* Status Icon */}
        <div className="notification-icon-wrapper">
          {icon}
        </div>

        {/* Message Content */}
        <div className="notification-message-wrapper">
          <p className="notification-from">{from}</p>
          <p className="notification-message">{message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="notification-close-button"
          aria-label="Close notification"
        >
          <AiOutlineClose className="notification-close-icon" />
        </button>
      </div>
    </div>
  );
};

export default Notification;


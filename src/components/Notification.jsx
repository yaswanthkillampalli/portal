import { RiCloseCircleFill } from "react-icons/ri";
import styles from '../styles/Notification.module.css';

export default function Notification({ message, type, onClose }) {
  const getNotificationStyle = () => {
    switch (type) {
      case 200:
        return { backgroundColor: '#d4edda', color: '#155724' };
      case 404:
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      case 401:
        return { backgroundColor: '#d1ecf1', color: '#0c5460' };
      case 500:
        return { backgroundColor: '#d1ecf1', color: '#0c5460' };
      default:
        return { backgroundColor: '#fff3cd', color: '#856404' };
    }
  };

  return (
    <>
    <div className={styles.notification} style={getNotificationStyle()}>
      <span>{message}</span>
      <RiCloseCircleFill className={styles.closeIcon} onClick={onClose} />
    </div>
    </>
  );
}
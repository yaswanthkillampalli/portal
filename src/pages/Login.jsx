import styles from '../styles/Login.module.css';
import Logo from '../assets/logo.png';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useState } from 'react';
import { login } from '../services/auth'; // Import the login function
import Notification from '../components/Notification';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = document.getElementById('loginForm');
    const formData = new FormData(form);

    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
      // The 'rememberme' field from the form is now ignored by auth.js,
      // so you can keep it or remove it from here based on your form structure.
      rememberme: formData.get('rememberme') === 'on', // This line is now effectively ignored by auth.js
    };
    try {
      const success = await login(data); // This call is correct
      if (success === 200) { // Check if the status code is 200
        
        alert('Login successful! Redirecting to the dashboard...');
      } else {
        console.log('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login process:', error);
      console.log('An error occurred during login. Please try again later.');
    }
  };

  return (
  <>
    <Notification
      message="Welcome to the Portal! Please log in to continue."
      type={200} // Assuming 200 is for success
      onClose={() => console.log('Notification closed')}
    />
    <div className={styles.loginPage}>
      <div className={styles.loginNavbar}>
        <div className={styles.loginNavbarContainer}>
          <div className={styles.loginNavbarLogo}>
            <img src={Logo} alt="Logo" className={styles.logoImage} />
            <h1>PORTAL</h1>
          </div>
          <div className={styles.loginNavbarLinks}>
            <button className={styles.loginNavbarButton}>Contact</button>
          </div>
        </div>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginPageLogoContainer}>
          <img src={Logo} alt="Logo" className={styles.loginPageLogo} />
        </div>
        <div className={styles.loginPageFormContainer}>
          <h1 className={styles.loginPageTitle}>USER LOGIN</h1>
          <form id='loginForm' onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.loginFormContainer}>
              <p className={styles.loginFormLabel}>Username</p>
              <div className={styles.loginFormInputContainer}>
                <FaUser className={styles.loginFormIcon} />
                <input
                  name="username"
                  id='username'
                  type="text"
                  className={styles.loginFormInput}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <p className={styles.loginFormLabel}>Password</p>
              <div className={styles.loginFormInputContainer}>
                <FaLock className={styles.loginFormIcon} />
                <input
                  type="password"
                  name="password"
                  id='password'
                  className={styles.loginFormInput}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className={styles.loginFormRememberMeContainer}>
                <input
                  name="rememberme"
                  id='rememberme'
                  type="checkbox"
                  className={styles.loginFormRememberMeCheckbox}
                />
                <label className={styles.loginFormRememberMeLabel}>Remember Me</label>
              </div>
              <div className={styles.loginFormButtonContainer}>
                <button type="submit" className={styles.loginFormButton}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

export default Login;
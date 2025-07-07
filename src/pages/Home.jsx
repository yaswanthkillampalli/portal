import '../styles/Home.css';
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import Logo from '../assets/logo.png';
import image from '../assets/image.png';
import Progress from '../components/Progress';
import MinimalCalendar from '../components/MinimalCalendar';
import CountUp from '../components/CountUp';
import NearestExam from '../components/NearestExam';
import DueAssignment from '../components/DueAssignment';
import { getAttendencePercentage, getTotalCertificates, getCurrentCGPA, getTotalCoursesRegistered, upcomingExamsCache, getTotalCredits } from '../services/student';
import { IoNotifications } from "react-icons/io5";

export default function Home() {
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Initial state set to true
  const [currentCGPA, setCurrentCGPA] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [upcomingExams, setUpcomingExams] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true); // Ensure loading state is true when fetching starts
      try {
        // Use Promise.all to wait for all data fetches to complete concurrently
        const [
          attendanceData,
          cgpaData,
          totalCoursesData,
          creditsData,
          certificatesData,
          examsData
        ] = await Promise.all([
          getAttendencePercentage(),
          getCurrentCGPA(),
          getTotalCoursesRegistered(),
          getTotalCredits(),
          getTotalCertificates(),
          upcomingExamsCache()
        ]);

        setAttendancePercentage(attendanceData.attendancePercentage);
        setCurrentCGPA(cgpaData);
        setTotalCourses(totalCoursesData);
        setTotalCredits(creditsData);
        setTotalCertificates(certificatesData);
        setUpcomingExams(examsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchAllData();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Take full viewport height
        width: '100vw',  // Take full viewport width
        backgroundColor: '#f0f2f5', // Optional: add a background color
        flexDirection: 'column',
        gap: '20px'
      }}>
        <HashLoader color="#1217b5" size={40} speedMultiplier={2} />
      </div>
    );
  }

  return (
    <>
      <div className="home-page">
        <div className='home-navbar'>
          <div className='home-navbar-container'>
            <div className='home-navbar-logo'>
              <img src={Logo} alt="Logo" className='logo-image' />
              <h1>PORTAL</h1>
            </div>
            <div className='home-navbar-links'>
              <IoNotifications className='home-notification-symbol' />
              <div className='home-profile-pic-container'>
                <img src={image} alt="Profile" className='home-navbar-profile' />
              </div>
            </div>
          </div>
        </div>
        <div className='home-greet-content'>
          <div className='home-greeting-container'>
            <h1>Hello, <span className='home-user-name' id="homeUserName">Killampalli Yaswanth Vardhan</span></h1>
            <p className='daily-message' id='dailyMessage'>"The only way to do great work is to love what you do." - Steve Jobs</p>
          </div>
        </div>

        <div className='home-content'>
          <h1 className='home-dashboard'>Dashboard</h1>
          <div className='row-1'>
            <div className='home-item home-attendence-item'>
              <>
                <div className='home-single-item main-item'>
                  <h4 className='home-item-heading'>Attendence</h4>
                  <Progress value={attendancePercentage} suffix='%' />
                </div>
                <div className='home-single-item'>
                  <h4 className='home-item-heading'>CGPA</h4>
                  <CountUp target={currentCGPA} />
                </div>
                <div className='home-single-item'>
                  <h4 className='home-item-heading'>Courses</h4>
                  <CountUp target={totalCourses} />
                </div>
              </>
            </div>

            <div className='home-item home-attendence-item'>
              <div className='home-single-item main-item'>
                <h4 className='home-item-heading'>Total Credits</h4>
                <Progress value={totalCredits / totalCredits * 100} suffix='' displayValue={totalCredits} />
              </div>
              <div className='home-single-item'>
                <h4 className='home-item-heading'>Certificates</h4>
                <CountUp target={totalCertificates} /> 
              </div>
              <div className='home-single-item'>
                <h4 className='home-item-heading'>Upcoming Exam</h4>
                <NearestExam day={upcomingExams.day} examType={upcomingExams.examType} month={upcomingExams.month}/>
              </div>
            </div>
            <div className='home-item'>
              <h4 className='home-item-heading home-due-assignment-heading'>Due Assignments</h4>
              <div className='home-due-assignment-main-container'>
                <div className='home-due-assignment-container'>
                  <DueAssignment title="ML CT-5" code="ML" dueInDays={5} />
                  <DueAssignment title="AI CT-3" code="AI" dueInDays={2} />
                  <DueAssignment title="DS CT-4" code="DS" dueInDays={1} />
                  <DueAssignment title="ML CT-5" code="ML" dueInDays={5} />
                </div>
                <div className='home-due-assignment-container home-left-container'>
                  <DueAssignment title="ML CT-5" code="ML" dueInDays={5} />
                  <DueAssignment title="AI CT-3" code="AI" dueInDays={2} />
                  <DueAssignment title="DS CT-4" code="DS" dueInDays={1} />
                </div>
              </div>
            </div>
            <div className='home-item calendar-item'>
              <MinimalCalendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
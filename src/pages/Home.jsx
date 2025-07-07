import '../styles/Home.css';
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import Logo from '../assets/logo.png';
import image from '../assets/image.png';
import Progress from '../components/Progress';
import MinimalCalendar from '../components/MinimalCalendar';
import CountUp from '../components/CountUp';
import DueAssignment from '../components/DueAssignment';
import { getAttendencePercentage,getTotalCertificates,getCurrentCGPA, getTotalCoursesRegistered,upcomingExamsCache, getTotalCredits } from '../services/student';
import { IoNotifications } from "react-icons/io5";
export default function Home() {
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCGPA, setCurrentCGPA] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [upcomingExams, setUpcomingExams] = useState(null);
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setIsLoading(true); 
      try {
        const data = await getAttendencePercentage();
        const cgpa = await getCurrentCGPA();
        const totalCourses = await getTotalCoursesRegistered();
        setTotalCourses(totalCourses);
        setCurrentCGPA(cgpa);
        setAttendancePercentage(data.attendancePercentage);
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchTotalCredits = async () => {
      try {
        const credits = await getTotalCredits();
        const certificates = await getTotalCertificates();
        const exams = await upcomingExamsCache();
        setUpcomingExams(exams);
        setTotalCertificates(certificates);
        console.log(certificates);
        setTotalCredits(credits);
      } catch (error) {
        console.error("Failed to fetch total credits:", error);
      }
    }
    fetchTotalCredits();
    fetchAttendanceData();
  }, []); 
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
              <IoNotifications className='home-notification-symbol'/>
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
              {isLoading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%', 
                  width: '100%',
                  minWidth: '225px', 
                  flexDirection: 'column', 
                  gap: '10px'
                }}>
                  <HashLoader color="#1217b5" size={50} speedMultiplier={2}/> {/* Customize color and size */}
                </div>
              ) : (
                <>
                  <div className='home-single-item main-item'>
                    <h4 className='home-item-heading'>Attendence</h4>
                    <Progress value={attendancePercentage} suffix='%' />
                  </div>
                  <div className='home-single-item'>
                    <h4 className='home-item-heading'>SGPA</h4>
                    <CountUp target={currentCGPA}/>
                  </div>  
                  <div className='home-single-item'>
                    <h4 className='home-item-heading'>CGPA</h4>
                    <CountUp target={totalCourses}/>
                  </div>
                </>
              )}
            </div>
            
            <div className='home-item home-attendence-item'>
              <div className='home-single-item main-item'>
                <h4 className='home-item-heading'>Total Credits</h4>
                <Progress value={81} suffix='' displayValue={81}/>
              </div>
              <div className='home-single-item'>
                <h4 className='home-item-heading'>Courses</h4>
                <CountUp target={8}/>
              </div>
              <div className='home-single-item'>
                <h4 className='home-item-heading'>Certificates</h4>
                <CountUp target={0}/>
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


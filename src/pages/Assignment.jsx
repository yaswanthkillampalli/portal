import { useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa6';
import { PiTimerDuotone } from 'react-icons/pi';
import { GrScorecard } from 'react-icons/gr';
import { BsCardText, BsCalendar2Date, BsTrophy } from 'react-icons/bs';
import image from '../assets/image.png';
import '../styles/Assignment.css';

// Sample data for assignments (replace with API data in a real app)
const assignments = [
  {
    id: 1,
    title: 'Cloud Computing CT-1',
    status: 'Pending',
    marks: 30,
    dueDate: '28 AUG 2025',
    description: 'This assignment requires you to explain the different cloud service models (IaaS, PaaS, SaaS) and deployment models (Public, Private, Hybrid, Community). Provide real-world examples for each.',
    type: 'Essay',
    fullDueDate: '28 AUG 2025 18:00',
    questions: [
      'Define and differentiate between Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Provide one real-world example for each model.',
      'Explain the differences between Public, Private, Hybrid, and Community cloud deployment models. Include one real-world example for each.',
      'Discuss the advantages and disadvantages of using a Hybrid cloud model compared to a Public cloud model.',
    ],
  },
  {
    id: 2,
    title: 'Data Structures CT-2',
    status: 'Pending',
    marks: 25,
    dueDate: '30 AUG 2025',
    description: 'This assignment focuses on implementing and analyzing data structures like stacks and queues.',
    type: 'Coding',
    fullDueDate: '30 AUG 2025 18:00',
    questions: ['Implement a stack using arrays.', 'Analyze the time complexity of queue operations.'],
  },
  {
    id: 3,
    title: 'Operating Systems Quiz',
    status: 'Pending',
    marks: 20,
    dueDate: '25 AUG 2025',
    description: 'A quiz on operating system concepts including processes, threads, and memory management.',
    type: 'Quiz',
    fullDueDate: '25 AUG 2025 18:00',
    questions: ['Explain process scheduling.', 'What is virtual memory?'],
  },
];

export default function Assignment() {
  const [activeTab, setActiveTab] = useState('Assigned');
  const [selectedAssignment, setSelectedAssignment] = useState(assignments[0]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Add logic to filter assignments based on tab (e.g., API call)
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  return (
    <div className="assignment-page">
      <div className="assignment-page-navbar">
        <h1>Assignments</h1>
        <div className="assignment-page-navbar__buttons">
          <button className="assignment-page-navbar-home-button">Home</button>
          <IoNotifications className="icon assignment-home-notification-symbol" aria-label="Notifications" />
          <div className="assignment-profile-pic-container">
            <img src={image} alt="User profile" className="assignment-navbar-profile" />
          </div>
        </div>
      </div>
      <div className="assignment-content-div">
        <div className="assignment-content-left-div">
          <div className="assignment-content-left-dive-buttons">
            {['Assigned', 'Submitted', 'Completed'].map((tab) => (
              <button
                key={tab}
                className={`assignment-content-left-div-button ${activeTab === tab ? 'assignment-content-left-div-button-active' : ''}`}
                onClick={() => handleTabChange(tab)}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="assignmentcontent-left-div-assignment">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="assignment-div"
                onClick={() => handleAssignmentClick(assignment)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleAssignmentClick(assignment)}
              >
                <div className="assignment-div-title">
                  <h2>{assignment.title}</h2>
                  <div className="assignment-div-title-small-info-div">
                    <div className="d-flex">
                      <FaCircle className="icon assignment-div-title-small-info-div-circle-status" aria-hidden="true" />
                      <p className="assignment-div-title-small-info-div-text">{assignment.status}</p>
                    </div>
                    <div className="d-flex">
                      <GrScorecard className="icon assignment-div-title-small-info-div-circle-score" aria-hidden="true" />
                      <p className="assignment-div-title-small-info-div-text">{assignment.marks} Marks</p>
                    </div>
                    <div className="d-flex">
                      <PiTimerDuotone className="icon assignment-div-title-small-info-div-circle-time" aria-hidden="true" />
                      <p className="assignment-div-title-small-info-div-text">{assignment.dueDate}</p>
                    </div>
                  </div>
                </div>
                <button className="assignment-open-button" aria-label={`Open ${assignment.title}`}>
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="assignment-preview-right-div">
          <h1>{selectedAssignment.title}</h1>
          <p className="assignment-preview-description">{selectedAssignment.description}</p>
          <ul className="assignment-preview-details">
            <li>
              <BsTrophy className="assignment-preview-icon" aria-hidden="true" />
              <span>Max Marks: {selectedAssignment.marks}</span>
            </li>
            <li>
              <BsCardText className="assignment-preview-icon" aria-hidden="true" />
              <span>Assignment Type: {selectedAssignment.type}</span>
            </li>
            <li>
              <BsCalendar2Date className="assignment-preview-icon" aria-hidden="true" />
              <span>Due Date: {selectedAssignment.fullDueDate}</span>
            </li>
          </ul>
          <div className="assignment-preview-questions">
            <h4>Questions</h4>
            <ol>
              {selectedAssignment.questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
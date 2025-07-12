import { useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { BsCardText, BsCalendar2Date, BsTrophy } from 'react-icons/bs';
import image from '../assets/image.png';
import '../styles/FullAssignment.css'

const assignment = {
  _id: { $oid: '686fd1c99a7a41d5b2510100' },
  courseId: { $oid: '686fce674dbdd10cd71d3eec' },
  facultyId: { $oid: '68559de686bc57e750f84cbc' },
  title: 'Cloud Computing CT-1',
  description: 'This assignment requires you to explain the different cloud service models (IaaS, PaaS, SaaS) and deployment models (Public, Private, Hybrid, Community). Provide real-world examples for each.',
  assignmentType: 'Essay',
  totalMarks: 30,
  dueDate: { $date: '2025-08-15T23:59:59.000Z' },
  questions: [
    {
      questionNumber: 1,
      questionText: 'Define and differentiate between Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Provide one real-world example for each model.',
      maxScore: 10,
    },
    {
      questionNumber: 2,
      questionText: 'Explain the four primary cloud deployment models: Public, Private, Hybrid, and Community. Discuss the advantages and disadvantages of each.',
      maxScore: 10,
    },
    {
      questionNumber: 3,
      questionText: 'Discuss the key security concerns in cloud computing and outline common strategies to mitigate these risks.',
      maxScore: 10,
    },
  ],
  attachments: [],
  createdAt: { $date: '2025-07-10T20:09:00.000Z' },
  updatedAt: { $date: '2025-07-10T20:09:00.000Z' },
};

// Simulated server-fetched data (replace with API calls)
const courseName = 'Cloud Computing'; // Fetch using courseId
const facultyName = 'Dr. John Smith'; // Fetch using facultyId
const uploadGuidelines = {
  maxFileSize: '10MB',
  acceptedFormats: ['PDF', 'DOC', 'DOCX'],
  additionalInfo: 'Ensure your submission is a single file containing answers to all questions.',
};

export default function FullAssignment() {
  const [files, setFiles] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const extension = file.name.split('.').pop().toLowerCase();
      const isValidType = uploadGuidelines.acceptedFormats
        .map((fmt) => fmt.toLowerCase())
        .includes(extension);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== selectedFiles.length) {
      setSubmissionStatus('Invalid file(s). Only PDF, DOC, DOCX files up to 10MB are allowed.');
      setFiles([]);
      document.getElementById('file-upload').value = '';
      return;
    }

    setFiles(validFiles);
    setSubmissionStatus(
      validFiles.length > 0
        ? `${validFiles.length} file${validFiles.length > 1 ? 's' : ''} selected`
        : ''
    );
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      setSubmissionStatus('Please select at least one valid file.');
      return;
    }
    // Simulate file submission (replace with API call)
    setSubmissionStatus('Submission successful!');
    setFiles([]);
    document.getElementById('file-upload').value = '';
  };

  return (
    <div className="full-assignment-page">
      <div className="full-assignment-navbar">
        <h1>{assignment.title}</h1>
        <div className="full-assignment-navbar__buttons">
          <button className="full-assignment-navbar-home-button">Back to Assignments</button>
          <IoNotifications
            className="icon full-assignment-notification-symbol"
            aria-label="Notifications"
          />
          <div className="full-assignment-profile-pic-container">
            <img src={image} alt="User profile" className="full-assignment-profile" />
          </div>
        </div>
      </div>
      <div className="full-assignment-content">
        <div className="full-assignment-left-panel">
          <div className="full-assignment-details">
            <h2>Assignment Details</h2>
            <p className="full-assignment-course-info">
              Course: {courseName} | Faculty: {facultyName}
            </p>
            <p className="full-assignment-description">{assignment.description}</p>
            <ul className="full-assignment-details-list">
              <li>
                <BsTrophy className="full-assignment-icon" aria-hidden="true" />
                <span>Max Marks: {assignment.totalMarks}</span>
              </li>
              <li>
                <BsCardText className="full-assignment-icon" aria-hidden="true" />
                <span>Assignment Type: {assignment.assignmentType}</span>
              </li>
              <li>
                <BsCalendar2Date className="full-assignment-icon" aria-hidden="true" />
                <span>Due Date: {new Date(assignment.dueDate.$date).toLocaleString()}</span>
              </li>
            </ul>
          </div>
          <div className="full-assignment-questions">
            <h3>Questions</h3>
            <ol>
              {assignment.questions.map((question) => (
                <li key={question.questionNumber}>
                  {question.questionText} <strong>({question.maxScore} marks)</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="full-assignment-right-panel">
          <div className="full-assignment-upload">
            <h3>Submit Your Assignment</h3>
            <div className="full-assignment-upload-area">
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="full-assignment-file-input"
              />
              <label htmlFor="file-upload" className="full-assignment-upload-label">
                {files.length > 0
                  ? files.map((file) => file.name).join(', ')
                  : 'Click to upload or drag and drop (PDF, DOC, DOCX)'}
              </label>
              {submissionStatus && (
                <p
                  className={`full-assignment-status ${
                    submissionStatus.includes('successful') ? 'success' : 'error'
                  }`}
                >
                  {submissionStatus}
                </p>
              )}
            </div>
            <button
              className="full-assignment-submit-button"
              onClick={handleSubmit}
              disabled={files.length === 0}
            >
              Submit Assignment
            </button>
          </div>
          <div className="full-assignment-guidelines">
            <h3>Upload Guidelines</h3>
            <p>
              Max file size: {uploadGuidelines.maxFileSize}
              <br />
              Accepted formats: {uploadGuidelines.acceptedFormats.join(', ')}
              <br />
              {uploadGuidelines.additionalInfo}
            </p>
          </div>
          <div className="full-assignment-scoring">
            <h3>Scoring Details</h3>
            <ul className="full-assignment-scoring-list">
              {assignment.questions.map((question) => (
                <li key={question.questionNumber}>
                  Question {question.questionNumber}: {question.maxScore} marks
                </li>
              ))}
              <li>Total: {assignment.totalMarks} marks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
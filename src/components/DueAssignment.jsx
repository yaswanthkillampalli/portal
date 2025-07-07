import React from 'react';
import '../styles/DueAssignment.css' 

const DueAssignment = ({ code = "ML", title = "ML CT-5", dueInDays = 5 }) => {
  return (
    <div className='home-due-assignment-item'>
      <div className='home-due-assignment-items-text'>
        <h1 className='home-due-assignment-item-logo'>{code}</h1>
        <h1 className='home-due-assignment-item-name'>{title}</h1>
      </div>
      <div className="home-due-assignment-item-due-date">
        <h1 className="home-due-assignment-item-due-date-text">
          {dueInDays}
          <span className="home-due-assignment-item-due-date-info">Days</span>
        </h1>
      </div>
    </div>
  );
};

export default DueAssignment;

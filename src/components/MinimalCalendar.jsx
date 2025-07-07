import React from 'react';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import '../styles/MinimalCalendar.css'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MinimalCalendar = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // Sun = 0
  const offset = (firstDay === 0 ? 6 : firstDay - 1); // shift to Mon-start
  const totalDays = new Date(year, month + 1, 0).getDate();

  const isToday = (date) => {
    return date === today.getDate() &&
           month === today.getMonth() &&
           year === today.getFullYear();
  };

  const isSunday = (index, date) => {
    return (index + offset) % 7 === 6; // Sunday
  };

  const isSecondSaturday = (date) => {
    const d = new Date(year, month, date);
    return d.getDay() === 6 && Math.ceil(date / 7) === 2;
  };

  const dates = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="calendar-minimal">
      <div className="calendar-header">
        <FaArrowCircleLeft className='calendar-arrow-transform'/>
        <span>{today.toLocaleString('default', { month: 'long' })}</span>
        <FaArrowCircleRight className='calendar-arrow-transform'/>
      </div>
      <div className="calendar-grid">
        {days.map(day => <div key={day} className="day-name">{day}</div>)}
        {Array(offset).fill('').map((_, i) => (
          <div key={'empty-' + i} className="day-cell empty"></div>
        ))}
        {dates.map((date, i) => {
          const disabled = !isToday(date);
          const isHoliday = isSunday(i, date) || isSecondSaturday(date);
          return (
            <div
              key={date}
              className={`day-cell 
                ${disabled ? 'disabled' : 'selectable'}
                ${isToday(date) ? 'selected' : ''}
                ${isHoliday ? 'holiday' : ''}`
              }>
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MinimalCalendar;

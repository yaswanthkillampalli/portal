import CountUp from "./CountUp"
import '../styles/NearestExam.css'
export default function NearestExam({ day,month,examType }) {
  return (
    <>
      <div className="nearest-due-assignment-item-due-date">
        <h1 className="nearest-due-assignment-item-due-date-text">
          {day}
          <span className="nearest-due-assignment-item-due-date-info">{month}</span>
          {/* <span className="nearest-due-assignment-item-due-date-info">{examType}</span> */}
        </h1>
      </div>
    </>
  )
}
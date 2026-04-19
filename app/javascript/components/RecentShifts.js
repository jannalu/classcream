// app/javascript/components/RecentShifts.jsx
import React, { useState } from "react"
import PropTypes from "prop-types"
import AddShiftForm from "./AddShiftForm"

const RecentShifts = ({ employeeId, shifts, onShiftChange }) => {
  const [showForm, setShowForm] = useState(false)

  const handleDelete = (shiftId) => {
    fetch(`/v1/shifts/${shiftId}.json`, { method: "DELETE" })
      .then(() => onShiftChange())
  }

  return (
    <div>
      <h3>Recent Shifts</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shifts && shifts.map(({ data: shift }) => (
            <tr key={shift.id}>
              <td>{shift.attributes.date}</td>
              <td>{shift.attributes.start_time}</td>
              <td>{shift.attributes.end_time}</td>
              <td>{shift.attributes.status}</td>
              <td>
                {shift.attributes.status === "pending" && (
                  <button onClick={() => handleDelete(shift.id)}>✕</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm
        ? <AddShiftForm
            employeeId={employeeId}
            onShiftAdded={() => { setShowForm(false); onShiftChange() }}
            onCancel={() => setShowForm(false)}
          />
        : <button onClick={() => setShowForm(true)}>+ Add Shift</button>
      }
    </div>
  )
}

RecentShifts.propTypes = {
  employeeId: PropTypes.number,
  shifts: PropTypes.array,
  onShiftChange: PropTypes.func
}

export default RecentShifts
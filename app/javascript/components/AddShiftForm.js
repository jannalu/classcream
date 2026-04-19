// app/javascript/components/AddShiftForm.jsx
import React, { useState } from "react"
import PropTypes from "prop-types"

const AddShiftForm = ({ employeeId, onShiftAdded, onCancel }) => {
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")

  const handleSubmit = () => {
    fetch(`/v1/employees/${employeeId}/add_shift.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shift: { date, start_time: startTime } })
    })
      .then(res => res.json())
      .then(() => onShiftAdded())
  }

  return (
    <div>
      <div>
        <label>Date: </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        <label>Start Time: </label>
        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

AddShiftForm.propTypes = {
  employeeId: PropTypes.number,
  onShiftAdded: PropTypes.func,
  onCancel: PropTypes.func
}

export default AddShiftForm

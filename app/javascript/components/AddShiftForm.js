import React, { useState } from "react"
import PropTypes from "prop-types"

const AddShiftForm = ({ employeeId, onShiftAdded, onCancel }) => {
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("09:00")

  const handleSubmit = () => {
    fetch(`/v1/employees/${employeeId}/add_shift.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ shift: { date, start_time: startTime } })
    })
      .then(res => res.json())
      .then(onShiftAdded)
  }

  return (
    <div style={styles.formBox}>
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Date</label>
          <input type="date" style={styles.input} value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Start Time</label>
          <input type="time" style={styles.input} value={startTime} onChange={e => setStartTime(e.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <button style={styles.saveBtn} onClick={handleSubmit}>Save Shift</button>
        <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

const styles = {
  formBox: {
    background: "#f0ebe3",
    borderRadius: "8px",
    padding: "1rem 1.25rem",
    marginTop: "1rem",
  },
  row: { display: "flex", gap: "1.5rem" },
  field: { display: "flex", flexDirection: "column" },
  label: { fontSize: "13px", fontWeight: "500", marginBottom: "4px", color: "#333" },
  input: {
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    background: "#fff",
  },
  saveBtn: {
    background: "#1a2744",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    marginRight: "0.75rem",
  },
  cancelBtn: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "14px",
    cursor: "pointer",
  }
}

AddShiftForm.propTypes = {
  employeeId: PropTypes.number,
  onShiftAdded: PropTypes.func,
  onCancel: PropTypes.func
}
export default AddShiftForm
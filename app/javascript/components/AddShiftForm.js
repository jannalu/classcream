import React, { useState } from "react"
import PropTypes from "prop-types"

const AddShiftForm = ({ employeeId, onShiftAdded, onCancel }) => {
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("09:00")

  const handleSubmit = () => {
    const token = document.querySelector('meta[name="csrf-token"]')?.content
    fetch(`/v1/employees/${employeeId}/add_shift.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
      body: JSON.stringify({ shift: { date, start_time: startTime } }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        return res.json()
      })
      .then(onShiftAdded)
      .catch(err => console.error("Add shift error:", err))
  }

  return (
    <div style={styles.formBox}>
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            style={styles.input}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Start Time</label>
          <input
            type="time"
            style={styles.input}
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>
      </div>
      <div style={styles.actions}>
        <button style={styles.saveBtn} onClick={handleSubmit}>Save Shift</button>
        <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

const styles = {
  formBox: {
    background: "#fdf4ff",
    borderTop: "2px solid #f5d0fe",
    padding: "1.25rem 1.5rem",
    fontFamily: "'Nunito', sans-serif",
  },
  row: {
    display: "flex",
    gap: "1.5rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: "6px",
    color: "#a855f7",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "12px",
    border: "1.5px solid #e9d5ff",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'Nunito', sans-serif",
    background: "#fff",
    color: "#4b2067",
    outline: "none",
  },
  actions: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  saveBtn: {
    background: "linear-gradient(90deg, #f0abfc, #a78bfa)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "8px 20px",
    fontSize: "13px",
    fontWeight: "800",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
  },
  cancelBtn: {
    background: "none",
    border: "none",
    color: "#c084fc",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
  },
}

AddShiftForm.propTypes = {
  employeeId: PropTypes.number,
  onShiftAdded: PropTypes.func,
  onCancel: PropTypes.func,
}
export default AddShiftForm

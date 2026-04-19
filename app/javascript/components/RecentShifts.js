import React, { useState } from "react"
import PropTypes from "prop-types"
import AddShiftForm from "./AddShiftForm"

const RecentShifts = ({ employeeId, shifts, onShiftChange }) => {
  const [showForm, setShowForm] = useState(false)

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const [year, month, day] = dateStr.split("-")
    return `${month}/${day}/${year.slice(2)}`
  }

  const handleDelete = (shiftId) => {
    fetch(`/v1/shifts/${shiftId}.json`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }
    }).then(() => onShiftChange())
  }

  return (
    <div style={styles.card}>
      <h5 style={styles.cardTitle}>Recent Shifts</h5>
      <hr style={styles.divider} />
      {shifts?.length === 0 ? (
        <p style={{ fontSize: "14px", color: "#888" }}>No recent shifts.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>DATE</th>
              <th style={styles.th}>START</th>
              <th style={styles.th}>END</th>
              <th style={styles.th}>STATUS</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {shifts?.map(({ data: shift }) => (
              <tr key={shift.id} style={styles.tr}>
                <td style={styles.td}>{formatDate(shift.attributes.date)}</td>
                <td style={styles.td}>{shift.attributes.start_time}</td>
                <td style={styles.td}>{shift.attributes.end_time}</td>
                <td style={styles.td}>{shift.attributes.status?.charAt(0).toUpperCase() + shift.attributes.status?.slice(1)}</td>
                <td style={styles.td}>
                  {shift.attributes.status === "pending" && (
                    <span style={styles.deleteBtn} onClick={() => handleDelete(shift.id)}>⊗</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm ? (
        <AddShiftForm
          employeeId={employeeId}
          onShiftAdded={() => { setShowForm(false); onShiftChange() }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button style={styles.addBtn} onClick={() => setShowForm(true)}>⊕ Add Shift</button>
      )}
    </div>
  )
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "1.5rem",
    height: "100%",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#1a1a1a",
  },
  divider: { borderColor: "#e0d6c8", marginBottom: "1rem" },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { backgroundColor: "#1a2744" },
  th: {
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    padding: "10px 12px",
    textAlign: "left",
    letterSpacing: "0.05em",
  },
  tr: { borderBottom: "1px solid #f0ebe3" },
  td: { fontSize: "14px", padding: "10px 12px", color: "#333" },
  deleteBtn: { color: "crimson", cursor: "pointer", fontSize: "1.2rem" },
  addBtn: {
    marginTop: "1rem",
    background: "#1a2744",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
  }
}

RecentShifts.propTypes = {
  employeeId: PropTypes.number,
  shifts: PropTypes.array,
  onShiftChange: PropTypes.func
}
export default RecentShifts
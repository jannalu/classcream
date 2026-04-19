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
    const token = document.querySelector('meta[name="csrf-token"]')?.content
    fetch(`/v1/shifts/${shiftId}.json`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then(res => { if (res.ok) onShiftChange() })
      .catch(err => console.error("Delete error:", err))
  }

  const statusBadge = (status) => {
    const map = {
      finished: { background: "#f0fdf4", color: "#16a34a", border: "1.5px solid #bbf7d0" },
      pending:  { background: "#fff7ed", color: "#ea580c", border: "1.5px solid #fed7aa" },
      started:  { background: "#eff6ff", color: "#2563eb", border: "1.5px solid #bfdbfe" },
    }
    const s = map[status] || { background: "#f5f3ff", color: "#7c3aed", border: "1.5px solid #ddd6fe" }
    return {
      ...s,
      fontSize: "12px",
      padding: "3px 10px",
      borderRadius: "20px",
      fontWeight: "700",
      fontFamily: "'Nunito', sans-serif",
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <p style={styles.cardTitle}>Recent Shifts</p>
        <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          + Add Shift
        </button>
      </div>

      {shifts.length === 0 ? (
        <p style={styles.empty}>No recent shifts.</p>
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
            {shifts.map(({ data: shift }) => (
              <tr key={shift.id} style={styles.tr}>
                <td style={styles.td}>{formatDate(shift.attributes.date)}</td>
                <td style={styles.td}>{shift.attributes.start_time}</td>
                <td style={styles.td}>{shift.attributes.end_time}</td>
                <td style={styles.td}>
                  <span style={statusBadge(shift.attributes.status)}>
                    {shift.attributes.status?.charAt(0).toUpperCase() + shift.attributes.status?.slice(1)}
                  </span>
                </td>
                <td style={styles.td}>
                  {shift.attributes.status === "pending" && (
                    <span
                      style={styles.deleteIcon}
                      onClick={() => handleDelete(shift.id)}
                    >
                      ✕
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <AddShiftForm
          employeeId={employeeId}
          onShiftAdded={() => { setShowForm(false); onShiftChange() }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    border: "2px solid #f5d0fe",
    overflow: "hidden",
    fontFamily: "'Nunito', sans-serif",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 18px",
    background: "linear-gradient(90deg, #f0abfc, #a78bfa)",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: "800",
    color: "#fff",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "0.08em",
  },
  addBtn: {
    background: "#fff",
    color: "#c026d3",
    border: "none",
    borderRadius: "10px",
    padding: "5px 14px",
    fontSize: "13px",
    fontWeight: "800",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
  },
  empty: {
    fontSize: "13px",
    color: "#a855f7",
    padding: "0.75rem 1rem",
    margin: 0,
  },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#fdf4ff" },
  th: {
    padding: "10px 16px",
    fontSize: "11px",
    color: "#a855f7",
    fontWeight: "800",
    textAlign: "left",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
  },
  tr: { borderTop: "1.5px solid #fdf4ff" },
  td: {
    padding: "11px 16px",
    fontSize: "14px",
    color: "#4b2067",
    fontWeight: "600",
  },
  deleteIcon: {
    color: "#f9a8d4",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },
}

RecentShifts.propTypes = {
  employeeId: PropTypes.number,
  shifts: PropTypes.array,
  onShiftChange: PropTypes.func,
}
export default RecentShifts
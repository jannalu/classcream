import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const EmployeeHome = ({ employeeId }) => {
  const [spotlight, setSpotlight] = useState(null)
  const [shifts, setShifts] = useState([])
  const [currentShift, setCurrentShift] = useState(null)
  const [loading, setLoading] = useState(true)

  const csrfToken = () => document.querySelector('meta[name="csrf-token"]').content

  const fetchData = () => {
    fetch(`/v1/spotlight/${employeeId}.json`)
      .then(res => res.json())
      .then(data => setSpotlight(data.data.attributes))

    fetch(`/v1/my_upcoming_shifts.json`)
      .then(res => res.json())
      .then(data => setShifts(data.data || []))

    fetch(`/v1/current_shift.json`)
      .then(res => res.json())
      .then(data => {
        setCurrentShift(data.data || null)
        setLoading(false)
      })
  }

  useEffect(() => { fetchData() }, [employeeId])

  const handleClockIn = () => {
    fetch(`/v1/clock_in.json`, { method: "PUT", headers: { "X-CSRF-Token": csrfToken() } })
      .then(() => fetchData())
  }

  const handleClockOut = () => {
    fetch(`/v1/clock_out.json`, { method: "PUT", headers: { "X-CSRF-Token": csrfToken() } })
      .then(() => fetchData())
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const [year, month, day] = dateStr.split("-")
    return `${month}/${day}/${year.slice(2)}`
  }

  const getStatusLabel = (status) => status ? status.charAt(0).toUpperCase() + status.slice(1) : ""

  if (loading) return <p style={{ padding: "2rem", color: "#888" }}>Loading...</p>

  const shiftAttrs = currentShift?.attributes

  return (
    <div style={styles.page}>
      <div style={styles.grid}>

        {/* Left column */}
        <div style={styles.leftCol}>

          {/* Employee Overview */}
          {spotlight && (
            <div style={styles.card}>
              <h5 style={styles.cardTitle}>Employee Overview</h5>
              <hr style={styles.divider} />
              <p style={styles.row}><strong>Phone:</strong> {spotlight.phone}</p>
              <p style={styles.row}><strong>Date of Birth:</strong> {spotlight.date_of_birth}</p>
              <p style={styles.row}><strong>Role:</strong> {spotlight.role?.charAt(0).toUpperCase() + spotlight.role?.slice(1)}</p>
              <p style={styles.row}><strong>Current Store:</strong> {spotlight.current_store}</p>
              <p style={styles.row}><strong>Status:</strong> {spotlight.active ? "Active" : "Inactive"}</p>
            </div>
          )}

          {/* Upcoming Shifts */}
          <div style={styles.card}>
            <h5 style={styles.cardTitle}>Upcoming Shifts</h5>
            <hr style={styles.divider} />
            {shifts.length === 0 ? (
              <p style={{ fontSize: "14px", color: "#888" }}>No upcoming shifts scheduled.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thead}>
                    <th style={styles.th}>DATE</th>
                    <th style={styles.th}>STORE</th>
                    <th style={styles.th}>START TIME</th>
                    <th style={styles.th}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.map(shift => {
                    const s = shift.attributes
                    return (
                      <tr key={shift.id} style={styles.tr}>
                        <td style={styles.td}>{formatDate(s.date)}</td>
                        <td style={styles.td}>{s.store}</td>
                        <td style={styles.td}>{s.start_time}</td>
                        <td style={styles.td}>{getStatusLabel(s.status)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right column - Time Clock */}
        {currentShift && (
          <div style={styles.rightCol}>
            <div style={styles.card}>
              <h5 style={styles.cardTitle}>Time Clock</h5>
              <hr style={styles.divider} />
              <p style={styles.row}><strong>Employee:</strong> {spotlight?.name}</p>
              <p style={styles.row}><strong>Store:</strong> {shiftAttrs?.store}</p>
              <p style={styles.row}><strong>Date:</strong> {formatDate(shiftAttrs?.date)}</p>
              <hr style={styles.divider} />

              {shiftAttrs?.status === "pending" && (
                <>
                  <p style={styles.row}><strong>Scheduled Start:</strong> {shiftAttrs?.start_time}</p>
                  <p style={styles.row}><strong>Status:</strong> <span style={styles.badgePending}>Pending</span></p>
                  <button style={{...styles.btn, backgroundColor: "#2c6e49"}} onClick={handleClockIn}>
                    Start Shift
                  </button>
                </>
              )}

              {shiftAttrs?.status === "started" && (
                <>
                  <p style={styles.row}><strong>Started At:</strong> {shiftAttrs?.start_time}</p>
                  <p style={styles.row}><strong>Status:</strong> <span style={styles.badgeStarted}>In Progress</span></p>
                  <button style={{...styles.btn, backgroundColor: "#9b2335"}} onClick={handleClockOut}>
                    End Shift
                  </button>
                </>
              )}

              {shiftAttrs?.status === "finished" && (
                <>
                  <p style={styles.row}><strong>Started At:</strong> {shiftAttrs?.start_time}</p>
                  <p style={styles.row}><strong>Ended At:</strong> {shiftAttrs?.end_time}</p>
                  <p style={styles.row}><strong>Status:</strong> <span style={styles.badgeFinished}>Complete</span></p>
                  <p style={{ fontSize: "13px", color: "#888", marginTop: "0.75rem" }}>Your shift is complete. Have a great day!</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: "#f2ede6",
    minHeight: "100vh",
    padding: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
    alignItems: "start",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: "1.25rem" },
  rightCol: {},
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "1.5rem",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#1a1a1a",
  },
  divider: { borderColor: "#e0d6c8", marginBottom: "1rem" },
  row: { fontSize: "14px", color: "#333", marginBottom: "0.6rem" },
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
  btn: {
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 18px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "0.75rem",
  },
  badgePending: {
    backgroundColor: "#8b0000", color: "#fff",
    padding: "2px 10px", borderRadius: "4px", fontSize: "13px",
  },
  badgeStarted: {
    backgroundColor: "#28a745", color: "#fff",
    padding: "2px 10px", borderRadius: "4px", fontSize: "13px",
  },
  badgeFinished: {
    backgroundColor: "#1a2744", color: "#fff",
    padding: "2px 10px", borderRadius: "4px", fontSize: "13px",
  },
}

EmployeeHome.propTypes = { employeeId: PropTypes.number }
export default EmployeeHome
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import RecentShifts from "./RecentShifts"
import AssignmentHistory from "./AssignmentHistory"

const EmployeeShow = ({ employeeId }) => {
  const [spotlight, setSpotlight] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = () => {
    fetch(`/v1/spotlight/${employeeId}.json`)
      .then(res => res.json())
      .then(data => {
        setSpotlight(data.data.attributes)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => { fetchData() }, [employeeId])

  if (loading) return <p style={styles.loading}>Loading...</p>
  if (error)   return <p style={styles.error}>Error: {error}</p>
  if (!spotlight) return null

  const initials = `${spotlight.first_name?.[0] || ""}${spotlight.last_name?.[0] || ""}`.toUpperCase()
  const roleName = spotlight.role
    ? spotlight.role.charAt(0).toUpperCase() + spotlight.role.slice(1)
    : "—"

  return (
    <div style={styles.wrapper}>

      {/* ── Sidebar ── */}
      <div style={styles.sidebar}>
        <div style={styles.blob1} />
        <div style={styles.blob2} />

        <div style={styles.avatarSection}>
          <div style={styles.avatar}>{initials}</div>
          <p style={styles.name}>{spotlight.name}</p>
          <p style={styles.empId}>Employee #{employeeId}</p>
        </div>

        <div style={styles.divider} />

        <div style={styles.statList}>
          <StatBox label="Store"        value={spotlight.current_store || "—"} />
          <StatBox label="Role"         value={roleName} />
          <StatBox
            label="Status"
            value={spotlight.active ? "Active" : "Inactive"}
            valueStyle={{ color: spotlight.active ? "#bbf7d0" : "#fca5a5" }}
          />
          <StatBox label="Phone"        value={spotlight.phone} />
          <StatBox label="Date of Birth" value={spotlight.date_of_birth} />
        </div>

        <div style={styles.actions}>
          <a href={`/employees/${employeeId}/edit`} style={styles.btnEdit}>
            ✏️ Edit Profile
          </a>
          <a
            href={`/employees/${employeeId}`}
            data-method="delete"
            data-confirm="Are you sure?"
            style={styles.btnDelete}
          >
            🗑 Delete
          </a>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={styles.main}>
        <RecentShifts
          employeeId={employeeId}
          shifts={spotlight.shifts_at_current_assignment || []}
          onShiftChange={fetchData}
        />
        <AssignmentHistory
          assignments={spotlight.assignment_history || []}
        />
      </div>
    </div>
  )
}

/* ── Small helper ── */
const StatBox = ({ label, value, valueStyle = {} }) => (
  <div style={styles.statBox}>
    <p style={styles.statLabel}>{label.toUpperCase()}</p>
    <p style={{ ...styles.statValue, ...valueStyle }}>{value}</p>
  </div>
)

/* ── Styles ── */
const styles = {
  loading: { padding: "2rem", color: "#a855f7", fontFamily: "'Nunito', sans-serif" },
  error:   { padding: "2rem", color: "#e11d48", fontFamily: "'Nunito', sans-serif" },

  wrapper: {
    display: "flex",
    fontFamily: "'Nunito', sans-serif",
    borderRadius: "20px",
    overflow: "hidden",
    border: "2px solid #f5d0fe",
    margin: "0 -12px",
  },

  /* sidebar */
  sidebar: {
    width: "320px",
    flex: "0 0 320px",
    background: "linear-gradient(160deg, #ff8dc7 0%, #c084fc 60%, #818cf8 100%)",
    padding: "2rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    top: "-40px",
    right: "-40px",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    bottom: "60px",
    left: "-20px",
    pointerEvents: "none",
  },

  avatarSection: { textAlign: "center", position: "relative", zIndex: 1 },
  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.3)",
    border: "3px solid rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    fontWeight: "800",
    color: "#fff",
    margin: "0 auto 0.6rem",
  },
  name: { color: "#fff", fontWeight: "800", fontSize: "24px", margin: 0 },  
  empId: { color: "rgba(255,255,255,0.7)", fontSize: "15px", margin: "4px 0 0" },  


  divider: {
    border: "none",
    borderTop: "1.5px dashed rgba(255,255,255,0.35)",
    position: "relative",
    zIndex: 1,
  },

  statList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    position: "relative",
    zIndex: 1,
  },
  statBox: {
    background: "rgba(255,255,255,0.2)",
    borderRadius: "14px",
    padding: "10px 14px",
  },
  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    margin: "0 0 2px",
  },
  statValue: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    margin: 0,
  },

  actions: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    position: "relative",
    zIndex: 1,
  },
  btnEdit: {
    display: "block",
    textAlign: "center",
    background: "rgba(255,255,255,0.25)",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.5)",
    borderRadius: "12px",
    padding: "8px",
    fontSize: "13px",
    fontWeight: "700",
    textDecoration: "none",
  },
  btnDelete: {
    display: "block",
    textAlign: "center",
    background: "rgba(255,100,100,0.2)",
    color: "#ffe4e4",
    border: "1.5px solid rgba(255,180,180,0.4)",
    borderRadius: "12px",
    padding: "8px",
    fontSize: "13px",
    fontWeight: "700",
    textDecoration: "none",
  },

  /* main */
  main: {
    flex: 1,
    background: "#fff9fe",
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "auto",
  },
}

EmployeeShow.propTypes = { employeeId: PropTypes.number }
export default EmployeeShow
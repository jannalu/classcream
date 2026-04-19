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

  const getStatusLabel = (status) =>
    status ? status.charAt(0).toUpperCase() + status.slice(1) : ""

  if (loading) return <p style={styles.loading}>Loading...</p>

  const shiftAttrs = currentShift?.attributes
  const status = shiftAttrs?.status

  // Time Clock card theming driven by shift status
  const clockTheme = {
    pending: {
      border: "2px solid #fed7aa",
      header: "linear-gradient(90deg, #fb923c, #f97316)",
      btnBg: "linear-gradient(90deg, #fb923c, #f97316)",
    },
    started: {
      border: "2px solid #bbf7d0",
      header: "linear-gradient(90deg, #34d399, #059669)",
      btnBg: "linear-gradient(90deg, #34d399, #059669)",
    },
    finished: {
      border: "2px solid #f5d0fe",
      header: "linear-gradient(90deg, #f0abfc, #a78bfa)",
      btnBg: null,
    },
  }
  const theme = clockTheme[status] || clockTheme.finished

  return (
    <div style={styles.page}>
      <div style={styles.grid}>

        {/* ── Left column ── */}
        <div style={styles.leftCol}>

          {/* Employee Overview */}
          {spotlight && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <p style={styles.cardTitle}>Employee Overview</p>
              </div>
              <div style={styles.cardBody}>
                <InfoRow label="Phone"         value={spotlight.phone} />
                <InfoRow label="Date of Birth" value={spotlight.date_of_birth} />
                <InfoRow label="Role"          value={spotlight.role?.charAt(0).toUpperCase() + spotlight.role?.slice(1)} />
                <InfoRow label="Current Store" value={spotlight.current_store} />
                <InfoRow
                  label="Status"
                  value={spotlight.active ? "Active" : "Inactive"}
                  valueStyle={{ color: spotlight.active ? "#16a34a" : "#dc2626", fontWeight: "700" }}
                />
              </div>
            </div>
          )}

          {/* Upcoming Shifts */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <p style={styles.cardTitle}>Upcoming Shifts</p>
            </div>
            {shifts.length === 0 ? (
              <p style={styles.empty}>No upcoming shifts scheduled.</p>
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

        {/* ── Right column: Time Clock ── */}
        {currentShift && (
          <div style={styles.rightCol}>
            <div style={{ ...styles.card, border: theme.border }}>
              <div style={{ ...styles.cardHeader, background: theme.header }}>
                <p style={styles.cardTitle}>Time Clock</p>
              </div>
              <div style={styles.cardBody}>
                <InfoRow label="Employee" value={spotlight?.name} />
                <InfoRow label="Store"    value={shiftAttrs?.store} />
                <InfoRow label="Date"     value={formatDate(shiftAttrs?.date)} />

                <div style={styles.divider} />

                {status === "pending" && (
                  <>
                    <InfoRow label="Scheduled Start" value={shiftAttrs?.start_time} />
                    <InfoRow label="Status" value={<span style={styles.badgePending}>Pending</span>} />
                    <button style={{ ...styles.btn, background: theme.btnBg }} onClick={handleClockIn}>
                      Start Shift
                    </button>
                  </>
                )}

                {status === "started" && (
                  <>
                    <InfoRow label="Started At" value={shiftAttrs?.start_time} />
                    <InfoRow label="Status" value={<span style={styles.badgeStarted}>In Progress</span>} />
                    <button style={{ ...styles.btn, background: theme.btnBg }} onClick={handleClockOut}>
                      End Shift
                    </button>
                  </>
                )}

                {status === "finished" && (
                  <>
                    <InfoRow label="Started At" value={shiftAttrs?.start_time} />
                    <InfoRow label="Ended At"   value={shiftAttrs?.end_time} />
                    <InfoRow label="Status"     value={<span style={styles.badgeFinished}>Complete</span>} />
                    <p style={styles.completeMsg}>Your shift is complete. Have a great day! 🍦</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

/* ── Helper component ── */
const InfoRow = ({ label, value, valueStyle = {} }) => (
  <p style={styles.infoRow}>
    <span style={styles.infoLabel}>{label}:</span>
    <span style={{ ...styles.infoValue, ...valueStyle }}>{value}</span>
  </p>
)

const styles = {
  loading: { padding: "2rem", color: "#a855f7", fontFamily: "'Nunito', sans-serif" },

  page: {
    background: "#fff9fe",
    padding: "1.5rem",
    fontFamily: "'Nunito', sans-serif",
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
    borderRadius: "16px",
    border: "2px solid #f5d0fe",
    overflow: "hidden",
  },
  cardHeader: {
    background: "linear-gradient(90deg, #f0abfc, #a78bfa)",
    padding: "12px 18px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "0.06em",
  },
  cardBody: {
    padding: "1.25rem 1.5rem",
  },

  infoRow: {
    display: "flex",
    gap: "6px",
    margin: "0 0 0.6rem",
  },
  infoLabel: {
    color: "#a855f7",
    fontWeight: "800",
    fontSize: "13px",
    minWidth: "120px",
  },
  infoValue: {
    color: "#4b2067",
    fontWeight: "600",
    fontSize: "13px",
  },

  divider: {
    borderTop: "1.5px dashed #e9d5ff",
    margin: "0.85rem 0",
  },

  empty: {
    fontSize: "13px",
    color: "#c084fc",
    padding: "0.75rem 1.5rem",
    margin: 0,
    fontWeight: "600",
  },

  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#fdf4ff" },
  th: {
    color: "#a855f7",
    fontSize: "11px",
    fontWeight: "800",
    padding: "10px 16px",
    textAlign: "left",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
  },
  tr: { borderTop: "1.5px solid #fdf4ff" },
  td: { fontSize: "14px", padding: "11px 16px", color: "#4b2067", fontWeight: "600" },

  btn: {
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "9px 22px",
    fontSize: "13px",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "0.85rem",
    fontFamily: "'Nunito', sans-serif",
  },

  badgePending: {
    background: "#fff7ed",
    color: "#ea580c",
    border: "1.5px solid #fed7aa",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },
  badgeStarted: {
    background: "#f0fdf4",
    color: "#16a34a",
    border: "1.5px solid #bbf7d0",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },
  badgeFinished: {
    background: "#eff6ff",
    color: "#2563eb",
    border: "1.5px solid #bfdbfe",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },

  completeMsg: {
    fontSize: "13px",
    color: "#c084fc",
    fontWeight: "600",
    marginTop: "0.75rem",
  },
}

EmployeeHome.propTypes = { employeeId: PropTypes.number }
export default EmployeeHome

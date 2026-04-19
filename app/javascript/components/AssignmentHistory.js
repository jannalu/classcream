import React from "react"
import PropTypes from "prop-types"

const AssignmentHistory = ({ assignments }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <p style={styles.cardTitle}>Assignment History</p>
      </div>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>STORE</th>
            <th style={styles.th}>LEVEL</th>
            <th style={styles.th}>START</th>
            <th style={styles.th}>END</th>
          </tr>
        </thead>
        <tbody>
          {assignments && assignments.map(({ data: a }) => (
            <tr key={a.id} style={styles.tr}>
              <td style={styles.td}>{a.attributes.store}</td>
              <td style={styles.td}>{a.attributes.pay_grade}</td>
              <td style={styles.td}>{a.attributes.start_date}</td>
              <td style={styles.td}>
                {a.attributes.end_date
                  ? a.attributes.end_date
                  : <span style={styles.currentBadge}>Current</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    border: "2px solid #c7d2fe",
    overflow: "hidden",
    fontFamily: "'Nunito', sans-serif",
  },
  cardHeader: {
    padding: "12px 18px",
    background: "linear-gradient(90deg, #818cf8, #60a5fa)",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: "800",
    color: "#fff",
    margin: 0,
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "0.08em",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#f0f9ff" },
  th: {
    padding: "10px 16px",
    fontSize: "11px",
    color: "#6366f1",
    fontWeight: "800",
    textAlign: "left",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
  },
  tr: { borderTop: "1.5px solid #f0f9ff" },
  td: {
    padding: "11px 16px",
    fontSize: "14px",
    color: "#312e81",
    fontWeight: "600",
  },
  currentBadge: {
    background: "#f0fdf4",
    color: "#16a34a",
    border: "1.5px solid #bbf7d0",
    fontSize: "12px",
    padding: "3px 10px",
    borderRadius: "20px",
    fontWeight: "700",
    fontFamily: "'Nunito', sans-serif",
  },
}

AssignmentHistory.propTypes = { assignments: PropTypes.array }
export default AssignmentHistory
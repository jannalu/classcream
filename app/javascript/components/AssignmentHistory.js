import React from "react"
import PropTypes from "prop-types"

const AssignmentHistory = ({ assignments }) => {
  return (
    <div style={styles.card}>
      <h5 style={styles.cardTitle}>Assignment History</h5>
      <hr style={styles.divider} />
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
          {assignments && assignments.map(({ data: assignment }) => (
            <tr key={assignment.id} style={styles.tr}>
              <td style={styles.td}>{assignment.attributes.store}</td>
              <td style={styles.td}>{assignment.attributes.pay_grade}</td>
              <td style={styles.td}>{assignment.attributes.start_date}</td>
              <td style={styles.td}>{assignment.attributes.end_date || "Current"}</td>
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
    borderRadius: "10px",
    padding: "1.5rem",
    marginTop: "1rem",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#1a1a1a",
  },
  divider: {
    borderColor: "#e0d6c8",
    marginBottom: "1rem",
  },
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
}

AssignmentHistory.propTypes = { assignments: PropTypes.array }
export default AssignmentHistory
import React from "react"
import PropTypes from "prop-types"

const EmployeeOverview = ({ attrs }) => {
  return (
    <div style={styles.card}>
      <h5 style={styles.cardTitle}>Employee Overview</h5>
      <hr style={styles.divider} />
      <p style={styles.row}><strong>Phone:</strong> {attrs.phone}</p>
      <p style={styles.row}><strong>Date of Birth:</strong> {attrs.date_of_birth}</p>
      <p style={styles.row}><strong>Role:</strong> {attrs.role?.charAt(0).toUpperCase() + attrs.role?.slice(1)}</p>
      <p style={styles.row}><strong>Current Store:</strong> {attrs.current_store}</p>
      <p style={styles.row}><strong>Status:</strong> {attrs.active ? "Active" : "Inactive"}</p>
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
  divider: {
    borderColor: "#e0d6c8",
    marginBottom: "1rem",
  },
  row: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "0.6rem",
  }
}

EmployeeOverview.propTypes = { attrs: PropTypes.object }
export default EmployeeOverview
import React from "react"
import PropTypes from "prop-types"

const EmployeeOverview = ({ attrs }) => {
  return (
    <div>
      <h3>Employee Overview</h3>
      <p><strong>Phone:</strong> {attrs.phone}</p>
      <p><strong>Date of Birth:</strong> {attrs.date_of_birth}</p>
      <p><strong>Role:</strong> {attrs.role}</p>
      <p><strong>Current Store:</strong> {attrs.current_store}</p>
      <p><strong>Status:</strong> {attrs.active ? "Active" : "Inactive"}</p>
    </div>
  )
}

EmployeeOverview.propTypes = {
  attrs: PropTypes.object
}

export default EmployeeOverview
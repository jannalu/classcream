// app/javascript/components/AssignmentHistory.jsx
import React from "react"
import PropTypes from "prop-types"

const AssignmentHistory = ({ assignments }) => {
  return (
    <div>
      <h3>Assignment History</h3>
      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Level</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {assignments && assignments.map(({ data: assignment }) => (
            <tr key={assignment.id}>
              <td>{assignment.attributes.store}</td>
              <td>{assignment.attributes.pay_grade}</td>
              <td>{assignment.attributes.start_date}</td>
              <td>{assignment.attributes.end_date || "Current"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

AssignmentHistory.propTypes = {
  assignments: PropTypes.array
}

export default AssignmentHistory
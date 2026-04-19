// app/javascript/components/EmployeeHome.jsx
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const EmployeeHome = ({ employeeId }) => {
  const [spotlight, setSpotlight] = useState(null)
  const [shifts, setShifts] = useState([])
  const [currentShift, setCurrentShift] = useState(null)
  const [loading, setLoading] = useState(true)

  const csrfToken = () => document.querySelector('meta[name="csrf-token"]').content

  const fetchData = () => {
    // Fetch spotlight data
    fetch(`/v1/spotlight/${employeeId}.json`)
      .then(res => res.json())
      .then(data => {
        setSpotlight(data.data.attributes)
      })

    // Fetch upcoming shifts
    fetch(`/v1/my_upcoming_shifts.json`)
      .then(res => res.json())
      .then(data => {
        setShifts(data.data || [])
      })

    // Fetch current shift (today's shift)
    fetch(`/v1/current_shift.json`)
      .then(res => res.json())
      .then(data => {
        setCurrentShift(data.data || null)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [employeeId])

  const handleClockIn = () => {
    fetch(`/v1/clock_in.json`, {
      method: "PUT",
      headers: { "X-CSRF-Token": csrfToken() }
    })
      .then(res => res.json())
      .then(() => fetchData())
  }

  const handleClockOut = () => {
    fetch(`/v1/clock_out.json`, {
      method: "PUT",
      headers: { "X-CSRF-Token": csrfToken() }
    })
      .then(res => res.json())
      .then(() => fetchData())
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const [year, month, day] = dateStr.split("-")
    return `${month}/${day}/${year.slice(2)}`
  }

  const getStatusLabel = (status) => {
    if (!status) return ""
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getTimeClockStyle = (status) => {
    if (status === "started") return { backgroundColor: "#d4edda" }
    if (status === "finished") return { backgroundColor: "#ffffff" }
    return { backgroundColor: "#f0a500", color: "#1a1a1a" }
  }

  const getStatusBadgeStyle = (status) => {
    if (status === "started") return { backgroundColor: "#28a745", color: "white", padding: "2px 10px", borderRadius: "4px" }
    if (status === "finished") return { backgroundColor: "#2c3e50", color: "white", padding: "2px 10px", borderRadius: "4px" }
    return { backgroundColor: "#8b0000", color: "white", padding: "2px 10px", borderRadius: "4px" }
  }

  if (loading) return <p>Loading...</p>

  const shiftAttrs = currentShift?.attributes

  return (
    <div className="row mt-3">
      {/* Left column */}
      <div className="col-md-8 d-flex flex-column gap-3">

        {/* Employee Overview */}
        {spotlight && (
          <div className="card p-4">
            <h5 className="border-bottom pb-2">Employee Overview</h5>
            <p><strong>Phone:</strong> {spotlight.phone}</p>
            <p><strong>Date of Birth:</strong> {spotlight.date_of_birth}</p>
            <p><strong>Role:</strong> {spotlight.role}</p>
            <p><strong>Current Store:</strong> {spotlight.current_store}</p>
            <p><strong>Status:</strong> {spotlight.active ? "Active" : "Inactive"}</p>
          </div>
        )}

        {/* Upcoming Shifts */}
        <div className="card p-4">
          <h5 className="border-bottom pb-2">Upcoming Shifts</h5>
          {shifts.length === 0 ? (
            <p className="text-muted">No upcoming shifts scheduled.</p>
          ) : (
            <table className="table table-sm">
              <thead className="table-dark">
                <tr>
                  <th>DATE</th>
                  <th>STORE</th>
                  <th>START TIME</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map(shift => {
                  const s = shift.attributes
                  return (
                    <tr key={shift.id}>
                      <td>{formatDate(s.date)}</td>
                      <td>{s.store}</td>
                      <td>{s.start_time}</td>
                      <td>{getStatusLabel(s.status)}</td>
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
        <div className="col-md-4">
          <div className="card p-4" style={getTimeClockStyle(shiftAttrs?.status)}>
            <h5 className="border-bottom pb-2">Time Clock</h5>
            <p><strong>Employee:</strong> {spotlight?.name}</p>
            <p><strong>Store:</strong> {shiftAttrs?.store}</p>
            <p><strong>Date:</strong> {formatDate(shiftAttrs?.date)}</p>
            <hr />

            {shiftAttrs?.status === "pending" && (
              <>
                <p><strong>Scheduled Start:</strong> {shiftAttrs?.start_time}</p>
                <p>
                  <strong>Status: </strong>
                  <span style={getStatusBadgeStyle("pending")}>Pending</span>
                </p>
                <button className="btn mt-2" style={{ backgroundColor: "#2c6e49", color: "white" }} onClick={handleClockIn}>
                  Start Shift
                </button>
              </>
            )}

            {shiftAttrs?.status === "started" && (
              <>
                <p><strong>Started At:</strong> {shiftAttrs?.start_time}</p>
                <p>
                  <strong>Status: </strong>
                  <span style={getStatusBadgeStyle("started")}>In Progress</span>
                </p>
                <button className="btn btn-danger mt-2" onClick={handleClockOut}>
                  End Shift
                </button>
              </>
            )}

            {shiftAttrs?.status === "finished" && (
              <>
                <p><strong>Started At:</strong> {shiftAttrs?.start_time}</p>
                <p><strong>Ended At:</strong> {shiftAttrs?.end_time}</p>
                <p>
                  <strong>Status: </strong>
                  <span style={getStatusBadgeStyle("finished")}>Complete</span>
                </p>
                <p className="mt-2 text-muted">Your shift is complete. Have a great day!</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

EmployeeHome.propTypes = {
  employeeId: PropTypes.number
}

export default EmployeeHome
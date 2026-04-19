import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const EmployeeShow = ({ employeeId }) => {
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("09:00")

  const fetchShifts = () => {
    fetch(`/v1/spotlight/${employeeId}.json`)
      .then(res => res.json())
      .then(data => {
        console.log("Spotlight data:", JSON.stringify(data, null, 2))
        const attrs = data.data.attributes
        setShifts(attrs.shifts_at_current_assignment || [])
        setLoading(false)
      })
      .catch(err => {
        console.error("Fetch error:", err)
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchShifts()
  }, [employeeId])

  const handleDelete = (shiftId) => {
    fetch(`/v1/shifts/${shiftId}.json`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }
    }).then(() => fetchShifts())
  }

  const handleAddShift = () => {
    fetch(`/v1/employees/${employeeId}/add_shift.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ shift: { date, start_time: startTime } })
    })
      .then(res => res.json())
      .then(() => {
        setShowForm(false)
        setDate("")
        setStartTime("09:00")
        fetchShifts()
      })
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const [year, month, day] = dateStr.split("-")
    return `${month}/${day}/${year.slice(2)}`
  }

  if (loading) return <p>Loading shifts...</p>
  if (error) return <p style={{color: "red"}}>Error: {error}</p>

  return (
    <div>
      <h5 className="border-bottom pb-2">Recent Shifts</h5>

      {shifts.length === 0 ? (
        <p>No recent shifts.</p>
      ) : (
        <table className="table table-sm">
          <thead className="table-dark">
            <tr>
              <th>DATE</th>
              <th>START</th>
              <th>END</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.data.id}>
                <td>{formatDate(shift.data.attributes.date)}</td>
                <td>{shift.data.attributes.start_time}</td>
                <td>{shift.data.attributes.end_time}</td>
                <td>{shift.data.attributes.status?.charAt(0).toUpperCase() + shift.data.attributes.status?.slice(1)}</td>
                <td>
                  {shift.data.attributes.status === "pending" && (
                    <span
                      style={{ color: "crimson", cursor: "pointer", fontSize: "1.2rem" }}
                      onClick={() => handleDelete(shift.data.id)}
                    >
                      ⊗
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!showForm ? (
        <button className="btn-cc btn-sm mt-2" onClick={() => setShowForm(true)}>
          ⊕ Add Shift
        </button>
      ) : (
        <div className="p-3 mt-3 rounded" style={{ backgroundColor: "#f0ebe3" }}>
          <div className="d-flex gap-3 cc-form-group">
            <div>
              <label className="cc-label">Date</label>
              <input
                type="date"
                className="cc-input"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="cc-label">Start Time</label>
              <input
                type="time"
                className="cc-input"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-cc btn-sm me-2" onClick={handleAddShift}>
            Save Shift
          </button>
          <button className="btn btn-link btn-sm text-muted" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

EmployeeShow.propTypes = {
  employeeId: PropTypes.number
}

export default EmployeeShow
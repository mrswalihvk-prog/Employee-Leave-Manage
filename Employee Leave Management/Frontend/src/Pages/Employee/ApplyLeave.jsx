import React, { useState } from 'react'
import axios from "axios";

const ApplyLeave = () => {

    const user = JSON.parse(localStorage.getItem("user"))

  const [formData, setFormData] = useState({
    employeeId: user._id,
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: ""
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        "  https://employee-leave-management-6clu.onrender.com/api/leave/add",
        formData
      )

      alert("Leave Applied")

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-white p-6 rounded shadow">

      <h1 className="text-3xl font-bold mb-6">
        Apply Leave
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        <select
          name="leaveType"
          className="border p-2"
          onChange={handleChange}
        >

          <option value="">
            Select Leave Type
          </option>

          <option value="Sick Leave">
            Sick Leave
          </option>

          <option value="Casual Leave">
            Casual Leave
          </option>

        </select>

        <input
          type="date"
          name="fromDate"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          type="date"
          name="toDate"
          className="border p-2"
          onChange={handleChange}
        />

        <textarea
          name="reason"
          placeholder="Reason"
          className="border p-2"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white py-2">
          Submit
        </button>

      </form>

    </div>
  )
}

export default ApplyLeave
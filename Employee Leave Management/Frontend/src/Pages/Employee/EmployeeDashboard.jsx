import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";


const EmployeeDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))

  const [leaves, setLeaves] = useState([])

  const fetchLeaves = async () => {

    try {

      const response = await axios.get(
        `  https://employee-leave-manage.onrender.com/api/leave/employee/${user._id}`
      )

      setLeaves(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, [])

  const totalLeaves = leaves.length

  const approvedLeaves = leaves.filter(
    leave => leave.status === "Approved"
  ).length

  const pendingLeaves = leaves.filter(
    leave => leave.status === "Pending"
  ).length

  const rejectedLeaves = leaves.filter(
    leave => leave.status === "Rejected"
  ).length
  return (
     <div>

      {/* Welcome Section */}

      <div className="bg-white p-6 rounded shadow mb-6">

        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user.name}
        </h1>

        <p className="text-gray-600">
          Department: {user.department}
        </p>

      </div>

      {/* Status Cards */}

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-blue-600 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Total Leaves
          </h2>

          <p className="text-3xl font-bold mt-2">
            {totalLeaves}
          </p>

        </div>

        <div className="bg-green-600 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Approved
          </h2>

          <p className="text-3xl font-bold mt-2">
            {approvedLeaves}
          </p>

        </div>

        <div className="bg-yellow-500 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Pending
          </h2>

          <p className="text-3xl font-bold mt-2">
            {pendingLeaves}
          </p>

        </div>

        <div className="bg-red-600 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Rejected
          </h2>

          <p className="text-3xl font-bold mt-2">
            {rejectedLeaves}
          </p>

        </div>

      </div>

      {/* Recent Leaves */}

      <div className="bg-white mt-8 p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-4">
          Recent Leave Requests
        </h2>

        <table className="w-full">

          <thead>

            <tr className="bg-gray-200">

              <th className="p-3">Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {
              leaves.slice(0, 5).map((leave) => (

                <tr
                  key={leave._id}
                  className="text-center border-b"
                >

                  <td className="p-3">
                    {leave.leaveType}
                  </td>

                  <td>
                    {new Date(leave.fromDate)
                      .toLocaleDateString()}
                  </td>

                  <td>
                    {new Date(leave.toDate)
                      .toLocaleDateString()}
                  </td>

                  <td>

                    <span
                      className={`
                        px-3 py-1 rounded text-white

                        ${leave.status === "Approved"
                          ? "bg-green-600"
                          : leave.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                        }
                      `}
                    >

                      {leave.status}

                    </span>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default EmployeeDashboard
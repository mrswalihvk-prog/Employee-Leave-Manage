import axios from "axios";
import React, { useEffect, useState } from "react";

const MyLeaves = () => {

      const user = JSON.parse(localStorage.getItem("user"))

  const [leaves, setLeaves] = useState([])

  const fetchLeaves = async () => {

    try {

      const response = await axios.get(
        `  https://employee-leave-management-6clu.onrender.com/api/leave/employee/${user._id}`
      )

      setLeaves(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, [])
  return (
     <div>

      <h1 className="text-3xl font-bold mb-6">
        My Leaves
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead>

          <tr className="bg-gray-200">

            <th className="p-3">Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {
            leaves.map((leave) => (

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
                  {leave.reason}
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
  )
}

export default MyLeaves
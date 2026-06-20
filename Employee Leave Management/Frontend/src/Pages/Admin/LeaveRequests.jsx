import axios from "axios";
import { useEffect, useState } from "react";

const LeaveRequests = () => {

  const [leaves, setLeaves] = useState([])

  // Fetch all leave requests

  const fetchLeaves = async () => {

    try {

      const response = await axios.get(
        "  https://employee-leave-manage.onrender.com/api/leave/all"
      )

      setLeaves(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    fetchLeaves()

  }, [])

  // Update Leave Status

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `  https://employee-leave-manage.onrender.com/api/leave/status/${id}`,
        { status }
      )

      fetchLeaves()

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Leave Requests
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead>

          <tr className="bg-gray-200">

            <th className="p-3">Employee</th>

            <th>Department</th>

            <th>Leave Type</th>

            <th>From</th>

            <th>To</th>

            <th>Reason</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {
            leaves.map((leave) => (

              <tr
                key={leave._id}
                className="text-center border-b"
              >

                {/* Employee Name */}

                <td className="p-3">

                  {leave.employeeId?.name}

                </td>

                {/* Department */}

                <td>

                  {leave.employeeId?.department}

                </td>

                {/* Leave Type */}

                <td>

                  {leave.leaveType}

                </td>

                {/* From Date */}

                <td>

                  {
                    new Date(
                      leave.fromDate
                    ).toLocaleDateString()
                  }

                </td>

                {/* To Date */}

                <td>

                  {
                    new Date(
                      leave.toDate
                    ).toLocaleDateString()
                  }

                </td>

                {/* Reason */}

                <td>

                  {leave.reason}

                </td>

                {/* Status */}

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

                {/* Actions */}

                <td className="space-x-2">

                  <button
                    onClick={() =>
                      updateStatus(
                        leave._id,
                        "Approved"
                      )
                    }

                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        leave._id,
                        "Rejected"
                      )
                    }

                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  )
}

export default LeaveRequests
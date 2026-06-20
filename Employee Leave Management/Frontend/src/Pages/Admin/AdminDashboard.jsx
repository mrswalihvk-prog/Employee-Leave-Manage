import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [employees, setEmployees] = useState([])

  const [leaves, setLeaves] = useState([])

  // Fetch Employees

  const fetchEmployees = async () => {

    try {

      const response = await axios.get(
        "  https://employee-leave-manage.onrender.com/api/employees/getemp"
      )


      setEmployees(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  // Fetch Leaves

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

    fetchEmployees()

    fetchLeaves()

  }, [])

  // Counts

  const totalEmployees = employees.length

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

      {/* Heading */}

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Cards */}

      <div className="grid grid-cols-5 gap-5">

        {/* Total Employees */}

        <div className="bg-blue-600 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Total Employees
          </h2>

          <p className="text-3xl font-bold mt-3">
            {totalEmployees}
          </p>

        </div>

        {/* Total Leaves */}

        <div className="bg-purple-600 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Total Leaves
          </h2>

          <p className="text-3xl font-bold mt-3">
            {totalLeaves}
          </p>

        </div>

        {/* Approved Leaves */}

        <div className="bg-green-600 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Approved
          </h2>

          <p className="text-3xl font-bold mt-3">
            {approvedLeaves}
          </p>

        </div>

        {/* Pending Leaves */}

        <div className="bg-yellow-500 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Pending
          </h2>

          <p className="text-3xl font-bold mt-3">
            {pendingLeaves}
          </p>

        </div>

        {/* Rejected Leaves */}

        <div className="bg-red-600 text-white p-5 rounded shadow">

          <h2 className="text-lg">
            Rejected
          </h2>

          <p className="text-3xl font-bold mt-3">
            {rejectedLeaves}
          </p>

        </div>

      </div>

      {/* Recent Leave Requests */}

      <div className="bg-white mt-10 p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-5">
          Recent Leave Requests
        </h2>

        <table className="w-full">

          <thead>

            <tr className="bg-gray-200">

              <th className="p-3">Employee</th>

              <th>Leave Type</th>

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

                    {leave.employeeId?.name}

                  </td>

                  <td>

                    {leave.leaveType}

                  </td>

                  <td>

                    {
                      new Date(
                        leave.fromDate
                      ).toLocaleDateString()
                    }

                  </td>

                  <td>

                    {
                      new Date(
                        leave.toDate
                      ).toLocaleDateString()
                    }

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

export default AdminDashboard
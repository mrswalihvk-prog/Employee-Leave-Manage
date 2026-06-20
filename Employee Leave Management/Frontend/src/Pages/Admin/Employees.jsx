import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("  https://employee-leave-management-6clu.onrender.com/api/employees/getemp");

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`  https://employee-leave-management-6clu.onrender.com/api/employees/delete/${id}`);

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>

          <p className="text-gray-500 mt-1">Manage all employee details here</p>
        </div>

        <Link
          to="/admin/add-employee"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Employee
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Department</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  {/* Avatar */}
                  {/* Employee Image */}
                  <img
                    src={`  https://employee-leave-management-6clu.onrender.com/uploads/${employee.image}`}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />

                  <span className="font-medium text-gray-700">
                    {employee.name}
                  </span>
                </td>

                <td className="p-4 text-gray-600">{employee.email}</td>

                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {employee.department}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/edit-employee/${employee._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-lg text-white shadow"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteEmployee(employee._id)}
                      className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-white shadow"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {employees.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No employees found
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    joinDate: "",
    salary: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.image) {
        return alert("Please select an image");
      }

      const employeeData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        employeeData.append(key, value);
      });

      const response = await axios.post(
        `  https://employee-leave-manage.onrender.com/api/employees/add`,
        employeeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        alert("Employee added successfully");

        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          department: "",
          joinDate: "",
          salary: "",
          image: null,
        });

        navigate("/admin/admin-employee");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to add employee");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Add Employee</h1>

          <p className="text-gray-500 mt-2">
            Fill in the employee details below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Employee Image */}
          <div className="flex flex-col col-span-2">
            <label className="mb-2 font-medium text-gray-700">
              Employee Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/png,image/jpeg,image/webp,application/pdf"
              className="border border-gray-300 rounded-lg p-3"
              onChange={(e) => {
                const file = e.target.files[0];

                setFormData({
                  ...formData,
                  image: file,
                });
              }}
            />
          </div>
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter employee name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Department</label>

            <select
              name="department"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="">Select Department</option>

              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="IT">IT</option>
              <option value="Design">Design</option>
            </select>
          </div>

          {/* Join Date */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Join Date</label>

            <input
              type="date"
              name="joinDate"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Salary */}
          <div className="flex flex-col col-span-2">
            <label className="mb-2 font-medium text-gray-700">Salary</label>

            <input
              type="number"
              name="salary"
              placeholder="Enter salary"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <button className="col-span-2 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl text-lg font-semibold shadow-md">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

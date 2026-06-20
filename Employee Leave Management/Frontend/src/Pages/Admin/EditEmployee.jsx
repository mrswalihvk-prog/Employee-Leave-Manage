import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () =>  {

  const { id } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    joinDate: "",
    salary: ""
  })

  // Fetch Employee Data

  const fetchEmployee = async () => {

    try {

      const response = await axios.get(
        `  https://employee-leave-manage.onrender.com/api/employees/getspeci/${id}`
      )

      setFormData({

        name: response.data.name || "",

        email: response.data.email || "",

        password: response.data.password || "",

        phone: response.data.phone || "",

        department: response.data.department || "",

        joinDate: response.data.joinDate
          ? response.data.joinDate.split("T")[0]
          : "",

        salary: response.data.salary || ""
      })

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    fetchEmployee()

  }, [])

  // Handle Input Change

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Update Employee

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.put(`  https://employee-leave-manage.onrender.com/api/employees/update/${id}`,formData)

      navigate("/admin/admin-employee")

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="bg-white p-6 rounded shadow">

      <h1 className="text-3xl font-bold mb-6">
        Edit Employee
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-5"
      >

        {/* Name */}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Email */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Password */}

        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Phone */}

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Department */}

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="border p-2"
        >

          <option value="">
            Select Department
          </option>

          <option value="HR">
            HR
          </option>

          <option value="Marketing">
            Marketing
          </option>

          <option value="Sales">
            Sales
          </option>

          <option value="IT">
            IT
          </option>

          <option value="Design">
            Design
          </option>

        </select>

        {/* Join Date */}

        <input
          type="date"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Salary */}

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Button */}

        <button
          className="bg-blue-600 text-white py-2 rounded"
        >
          Update Employee
        </button>

      </form>

    </div>
  )
}

export default EditEmployee
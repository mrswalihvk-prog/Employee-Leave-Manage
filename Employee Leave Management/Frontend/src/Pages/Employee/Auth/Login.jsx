import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

      const response = await axios.post(
        "  https://employee-leave-manage.onrender.com/api/auth/login",
        formData
      )

      if (response.data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        )

        if (response.data.user.role === "admin") {

          navigate("/admin")

        } else {

          navigate("/employee")
        }

      } else {

        alert(response.data.message)
      }

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 text-white py-2">
          Login
        </button>

      </form>

    </div>
  )
}

export default Login
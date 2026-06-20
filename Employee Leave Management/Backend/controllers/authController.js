import Employee from "../models/Employee.js"
import bcrypt from "bcrypt"




 


export const login = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await Employee.findOne({ email })

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      })
    }

      // compare entered password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {

      return res.json({
        success: false,
        message: "Wrong password"
      })
    }

    res.json({
      success: true,
      user
    })

  } catch (error) {
    console.log(error)

    res.json({
      success: false,
      message: "Something went wrong"
    })
  }
}
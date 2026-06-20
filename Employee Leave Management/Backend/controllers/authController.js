import Employee from "../models/Employee.js"
import bcrypt from "bcrypt"




 export const registerUser = async () => {
  try {
    

    const adminExists = await Employee.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Employee.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      phone: "9999999999",
      department: "IT",
      joinDate: new Date(),
      salary: 50000,
      role: "admin",
    });

    console.log("Admin seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed Error:", error.message);
    process.exit(1);
  }
};


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
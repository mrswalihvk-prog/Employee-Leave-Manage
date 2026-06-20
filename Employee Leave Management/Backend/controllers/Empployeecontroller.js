import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      department,
      designation,
      salary,
      role,
    } = req.body;

    // Check image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Employee image is required",
      });
    }

    // Check existing employee
    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
      return res.status(409).json({
        success: false,
        message: "Employee already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employee
    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      phone,
      department,
      designation,
      salary,
      role,
      image: req.file.filename,
    });

    return res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee,
    });
  } catch (error) {
    console.error("Add Employee Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      role: "employee",
    });

    res.json(employees);
  } catch (error) {
    console.log(error);
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    res.json(employee);
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(employee);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Employee deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

import UserModel from "../models/UserModel.js";
import { hash, compare } from "bcrypt";

export const registerUser = async (req, res) => {
  const { name, age, gender, email, password, city, mobile } = req.body;
  if (!name) {
    let err = new Error("Name field is missing!");
    throw err;
  }
  const hashPwd = await hash(password, 12);
  const userExists = await UserModel.findOne({ email: email }).select(
    "-password",
  );

  if (userExists) {
    res.status(200).json({
      message: "User already Exists please login",
    });
  }
  let userRecord = new UserModel({
    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    age,
    gender,
    email,
    password: hashPwd,
    city,
    mobile,
  });

  let { _id } = await userRecord.save();

  res.status(201).json({
    message: "Success",
    _id,
  });
};

export const GetUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json({
    message: "Success",
    users,
  });
};

export const GetUserByEmail = async (req, res) => {
  const { email } = req.params;

  const user = await UserModel.findOne({ email: email }).select("-password");
  res.status(200).json({
    message: "Success",
    users,
  });
};

// login
export const Login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await UserModel.findOne({ email: email });
  if (!userExists) {
    res.status(200).json({
      message: "User doesn't Exists please register",
    });
  }

  const isPassowrdMatch = await compare(password, userExists.password);

  if (!isPassowrdMatch) {
    res.status(404).json({ message: "Password mismatch! Try Again!" });
  }
  res.status(200).json({ message: "Successfully LoggedIn" });
};

// update user

//delete user

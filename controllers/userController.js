import UserModel from "../models/User.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

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

    const userExists = await UserModel.findOne({ email });

    if (!userExists) {
        return res.status(404).json({
        message: "User doesn't exist",
        });
    }

    const isPasswordMatch = await compare(password, userExists.password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "Password mismatch",
        });
    }

  const token = jwt.sign(
    {
      id: userExists._id,
      email: userExists.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

    res.status(200).json({
        message: "Login Success",
        token,
    });
};
// update user

//delete user

// controllers/userController.js

import User from "../models/User.js";

export const registerUser = async (req, res) => {

    try {

        const {
            name,
            age,
            gender,
            email,
            password,
            city,
            mobile
        } = req.body;

        // check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // create user
        const userRecord = new User({
            name,
            age,
            gender,
            email,
            password,
            city,
            mobile,
        });

        const resp = await userRecord.save();

        res.status(201).json({
            message: "User Registered Successfully",
            data: resp,
        });

    }
    catch (err) {

        res.status(500).json({
            message: "Registration Failed",
            error: err.message
        });
    }
};



export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // check password
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        res.status(200).json({
            message: "Login Successful",
            user
        });

    }
    catch (err) {

        res.status(500).json({
            message: "Error during login",
            error: err.message
        });
    }
};
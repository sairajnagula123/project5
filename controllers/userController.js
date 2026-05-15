// controllers/userController.js

import User from "../models/User.js";

export const registerUser = async (req, res) => {

    try {
        const userData = req.body;

        const newUser = await User.create(userData);

        res.status(201).json({
            message: "User Registered Successfully",
            data: newUser
        });
    } 
    catch (err) {
        res.status(500).json({
            message: "Error registering user"
        });
    }
};

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        res.status(200).json({
            message: "Login Successful"
        });

    } 
    catch (err) {
        res.status(500).json({
            message: "Error during login"
        });
    }
};
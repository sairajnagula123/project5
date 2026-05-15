// controllers/userController.js

import User from "../models/User.js";

export const register = async(req,res) => {
    const {name , age, gender, email, password, city, mobile} = req.body;

    let userRecord = new UserModel({
        name,
        age,
        gender,
        email,
        password,
        city,
        mobile,
    })

    let resp = await userRecord.save();

    res.json({
        message: "Success",
        resp,
    });
}




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
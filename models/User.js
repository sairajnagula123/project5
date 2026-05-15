// models/User.js

import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must contain at least 3 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },

        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [15, "Minimum age is 15"],
            max: [99, "Maximum age is 99"]
        },

        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: {
                values: ["Male", "Female", "Other"],
                message: "Gender must be Male, Female or Other"
            }
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,

            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email"
            ]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must contain at least 6 characters"]
        },

        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },

        mobile: {
            type: String,
            required: [true, "Mobile number is required"],

            match: [
                /^[0-9]{10}$/,
                "Mobile number must contain exactly 10 digits"
            ]
        }
    },
    {
        timestamps: true
    }
);

const User = model("User", userSchema);

export default User;
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
// api register user

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({ success: false, message: "Missing Values" });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email, enter a valid email",
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter a strong password",
            });
        }

        //hashin password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            username,
            email,
            password: hashedPassword,
        };

        const newUser = new User(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Missing values" });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email, enter a valid email",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User doesnt exist with this email",
            });
        }
        //hashin password

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return res.json({
                success: false,
                message: "Incorrect Credentials",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, message: "Login Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API GET USER DATA

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user data

export const updateProfile = async (req, res) => {
    try {
        const { userId, username, phone, address, dateOfBirth, gender } =
            req.body;
        const imageFile = req.file;

        if (!username || !phone || !dateOfBirth || !gender) {
            return res.json({ success: true, message: "data missing" });
        }
        const user = await User.findByIdAndUpdate(userId, {
            username,
            phone,
            dateOfBirth,
            address: JSON.parse(address),
            gender,
        });

        if (imageFile) {
            const imageUpload = await uploadOnCloudinary(imageFile.path);
            const imageURL = imageUpload.secure_url;
            await User.findByIdAndUpdate(userId, { image: imageURL });
        }
        res.json({ success: true, user, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
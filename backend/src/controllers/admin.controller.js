import validator from "validator";
import bcrypt from "bcrypt";
import { Doctor } from "../models/doctorSchema.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import jwt from "jsonwebtoken";

//API FOR ADD DOCTOR
export const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
        } = req.body;
        const imageFile = req.file;
        console.log(req.body);
        console.log(req.file);

        if (
            !name ||
            !email ||
            !password ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            !fees ||
            !address
        ) {
            return res.json({ success: false, message: "Missing Details" });
        }

        //Validating Email Format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Email Invalid" });
        }

        //Validating Password if strong
        if (password.length < 8) {
            return res.json({ success: false, message: "Use Strong Password" });
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await uploadOnCloudinary(imageFile.path);

        if (!imageUpload) {
            return res.json({
                success: false,
                message: "Image not uploaded yet",
            });
        }

        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
        };

        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "doctor added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);

            res.json({ success: true, token, message: "login Successful" });
        } else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select("-password");
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


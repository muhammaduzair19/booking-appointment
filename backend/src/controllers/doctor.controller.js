import validator from "validator";
import { Doctor } from "../models/doctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Appointment } from "../models/appointmentModel.js";

export const changeAvailabilty = async (req, res) => {
    try {
        const { docId } = req.body;
        const doctorData = await Doctor.findById(docId);
        doctorData.available = !doctorData.available;
        await doctorData.save();

        res.json({ success: true, message: "Availability changed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
export const doctorsList = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select(["-password", "-email"]);

        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password required.",
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email, enter a valid email",
            });
        }

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.json({
                success: false,
                message: "Doctor doesnt exist with this email",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            doctor.password
        );

        if (!isPasswordCorrect) {
            return res.json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, message: "Login Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// appointment Docotr api

export const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await Appointment.find({ docId }); 
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// export const completeAppointment = async``

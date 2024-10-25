import { Doctor } from "../models/doctorSchema.js";

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

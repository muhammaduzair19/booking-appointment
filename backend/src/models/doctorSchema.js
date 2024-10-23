import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: email,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        speciality: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true,
        },
        experience: { type: String, required: true },
        about: { type: String, required: true },
        available: { type: Boolean, required: true },
        fees: { type: Number, required: true },
        address: { type: Object, required: true },
        date: { type: Number, required: true },
        slots_booked: { type: Object, default: {} },
    },
    { minimize: false }
);

export const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

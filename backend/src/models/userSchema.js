import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        default: "",
    },
    address: { type: Object, default: { line1: "", line2: "" } },
    gender: {
        type: String,
        default: "Not Selected",
    },
    dateOfBirth: { type: String, default: "Not Selected" },
    phone: { type: String, default: "000000000" },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

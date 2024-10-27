import express from "express";
import {
    getUserData,
    loginUser,
    registerUser,
    updateProfile,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getUserData);
userRouter.post(
    "/update-profile",
    upload.single("image"),
    authUser,
    updateProfile
);

export default userRouter;

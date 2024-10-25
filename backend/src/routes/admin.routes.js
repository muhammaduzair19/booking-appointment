import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, getAllDoctors, loginAdmin } from "../controllers/admin.controller.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailabilty } from "../controllers/doctor.controller.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin , upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, getAllDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailabilty);

export default adminRouter;

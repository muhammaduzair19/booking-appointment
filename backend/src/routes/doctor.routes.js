import express from "express";
import { doctorsList } from "../controllers/doctor.controller.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorsList);

export default doctorRouter;

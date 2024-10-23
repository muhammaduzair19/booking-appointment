import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.routes.js";

// app config
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/admin", adminRouter);

export { app };

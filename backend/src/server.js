import { app } from "./app.js";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

//api endpoint
app.get("/", (req, res) => {
    res.send("<h1>API WORKING</h1>");
});

const PORT = process.env.PORT || 4000;

connectDB();
connectCloudinary();
app.listen(PORT, () => {
    console.log("SERVER RUNNING", PORT);
});

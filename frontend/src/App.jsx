import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Doctors from "./pages/doctors";
import About from "./pages/about";
import Profile from "./pages/profile";
import Appointment from "./pages/appointment";
import Contact from "./pages/contact";
import MyAppointment from "./pages/my-appointment";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const App = () => {
    return (
        <div className="mx-4 sm:mx-[10%]">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:speciality" element={<Doctors />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-profile" element={<Profile />} />
                <Route path="/appointment/:docId" element={<Appointment />} />
                <Route path="/my-appointment" element={<MyAppointment />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

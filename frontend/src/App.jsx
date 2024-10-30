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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentSuccessfull from "./pages/payment-successfull";
import PayementCancel from "./pages/payment-cancel";

const App = () => {
    return (
        <div className="mx-4 sm:mx-[10%]">
            <ToastContainer autoClose={2000} />
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
                <Route path="/payment-sucessfull/:appointmentId" element={<PaymentSuccessfull />} />
                <Route path="/cancel" element={<PayementCancel />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

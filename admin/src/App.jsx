import React from "react";
import Login from "./pages/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdminContext } from "./context/admin-context";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard";
import AllAppointments from "./pages/admin/all-appointments";
import AddDoctor from "./pages/admin/add-doctor";
import DoctorsList from "./pages/admin/doctors-list";

const AdminLayout = () => {
    return (
        <>
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <main className="w-full h-full">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

const App = () => {
    const { atoken } = useAdminContext();
    return atoken ? (
        <div className="bg-[#f8f9fd]">
            <ToastContainer />
            <Routes>
                <Route path="*" element={<Navigate to={"/"} />} />
                <Route element={<AdminLayout />}>
                    <Route path="/" element={<></>} />
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route
                        path="/all-appointments"
                        element={<AllAppointments />}
                    />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/doctors-list" element={<DoctorsList />} />
                </Route>
            </Routes>
        </div>
    ) : (
        <>
            <Login />
            <ToastContainer />
            <Routes>
                <Route path="/*" element={<Navigate to={"/login"} />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
};

export default App;

import React from "react";
import { assets } from "../assets/assets";
import { useAdminContext } from "../context/admin-context";
import { useDoctorContext } from "../context/doctor-context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { atoken, setAtoken } = useAdminContext();
    const { dtoken, setDtoken } = useDoctorContext();
    const navigate = useNavigate();
    const logoutHandler = () => {
        navigate("/");
        atoken && setAtoken("");
        dtoken && setDtoken("");
        atoken && localStorage.removeItem("atoken");
        dtoken && localStorage.removeItem("dtoken");
    };
    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
            <div className="flex items-center gap-2 text-xs">
                <img
                    className="w-36 cursor-pointer"
                    src={assets.admin_logo}
                    alt=""
                />
                <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
                    {atoken ? "Admin" : "Doctor"}
                </p>
            </div>
            <button
                onClick={logoutHandler}
                className="bg-primary text-white text-sm  px-10 py-2 rounded-full"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;

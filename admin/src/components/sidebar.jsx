import React from "react";
import { useAdminContext } from "../context/admin-context";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDoctorContext } from "../context/doctor-context";

const Sidebar = () => {
    const { atoken } = useAdminContext();
    const { dtoken } = useDoctorContext();
    return (
        <div className="min-h-screen bg-white  border-r shadow-lg">
            {atoken && (
                <ul className="text-[#515151] mt-5">
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive &&
                                "bg-[#f2f3ff] border-r-4 border-primary"
                            }`
                        }
                        to={"/admin-dashboard"}
                    >
                        <img src={assets.home_icon} alt="" />
                        <p className="max-md:hidden">Dashboard</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive &&
                                "bg-[#f2f3ff] border-r-4 border-primary"
                            }`
                        }
                        to={"/all-appointments"}
                    >
                        <img src={assets.appointment_icon} alt="" />
                        <p className="max-md:hidden">Appointments</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive &&
                                "bg-[#f2f3ff] border-r-4 border-primary"
                            }`
                        }
                        to={"/add-doctor"}
                    >
                        <img src={assets.add_icon} alt="" />
                        <p className="max-md:hidden">Add Doctor</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive &&
                                "bg-[#f2f3ff] border-r-4 border-primary"
                            }`
                        }
                        to={"doctors-list"}
                    >
                        <img src={assets.people_icon} alt="" />
                        <p className="max-md:hidden">Doctors List</p>
                    </NavLink>
                </ul>
            )}
            {dtoken && (
                <ul className="text-[#515151] mt-5">
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive &&
                                "bg-[#f2f3ff] border-r-4 border-primary"
                            }`
                        }
                        to={"/doctor-dashboard"}
                    >
                        <img src={assets.home_icon} alt="" />
                        <p className="max-md:hidden">Dashboard</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive &&
                                "bg-[#f2f3ff] border-r-4 border-primary"
                            }`
                        }
                        to={"/doctor-appointments"}
                    >
                        <img src={assets.appointment_icon} alt="" />
                        <p className="max-md:hidden">Appointments</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive &&
                                "bg-[#f2f3ff] border-r-4 border-primary"
                            }`
                        }
                        to={"doctor-profile"}
                    >
                        <img src={assets.people_icon} alt="" />
                        <p className="max-md:hidden">Profile</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;

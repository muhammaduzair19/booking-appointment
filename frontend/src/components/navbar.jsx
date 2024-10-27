import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken } = useAppContext();

    const logout = () => {
        setToken(false);
        localStorage.removeItem("userToken");
    };

    
    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500">
            <img
                onClick={() => navigate("/")}
                className="w-44 cursor-pointer"
                src={assets.logo}
                alt=""
            />
            <ul className="hidden   md:flex items-center gap-5 font-medium">
                <NavLink
                    className="px-4 py-2 rounded inline-block"
                    onClick={() => setShowMenu(false)}
                    to={"/"}
                >
                    <li className="py-1">HOME</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 bg-primary hidden  " />
                </NavLink>
                <NavLink
                    className="px-4 py-2 rounded inline-block"
                    onClick={() => setShowMenu(false)}
                    to={"/doctors"}
                >
                    <li className="py-1">DOCTORS</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 bg-primary hidden  " />
                </NavLink>
                <NavLink
                    className="px-4 py-2 rounded inline-block"
                    onClick={() => setShowMenu(false)}
                    to={"/about"}
                >
                    <li className="py-1">ABOUT</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 bg-primary hidden  " />
                </NavLink>
                <NavLink
                    className="px-4 py-2 rounded inline-block"
                    onClick={() => setShowMenu(false)}
                    to={"/contact"}
                >
                    <li className="py-1">CONTACT</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 bg-primary hidden   " />
                </NavLink>
            </ul>
            <div className=" flex items-center gap-4 ">
                {token ? (
                    <div className="flex items-center cursor-pointer gap-2 group relative">
                        <img
                            className="w-8 rounded-full"
                            src={assets.profile_pic}
                            alt=""
                        />
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                            <div
                                className="min-w-48 bg-stone-100 rounded flex flex-col gap-4
                            p-4"
                            >
                                <p
                                    onClick={() => navigate("/my-profile")}
                                    className="hover:text-black cursor-pointer"
                                >
                                    My Profile
                                </p>
                                <p
                                    onClick={() => navigate("/my-appointment")}
                                    className="hover:text-black cursor-pointer"
                                >
                                    My Appointment
                                </p>
                                <p
                                    onClick={logout}
                                    className="hover:text-black cursor-pointer"
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                        <img
                            className="w-2.5"
                            src={assets.dropdown_icon}
                            alt=""
                        />
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
                    >
                        Create account
                    </button>
                )}
                <img
                    onClick={() => setShowMenu(true)}
                    src={assets.menu_icon}
                    className="w-6 md:hidden"
                    alt=""
                />
                {/* MOBILE */}
                <div
                    className={`${
                        showMenu ? "fixed w-full" : "w-0 h-0"
                    }  md:hidden top-0 right-0 bottom-0 bg-white overflow-hidden z-60 transition-all duration-500`}
                >
                    <div className="flex justify-between items-center px-5 py-6">
                        <img className="w-36" src={assets.logo} alt="" />
                        <img
                            className="w-7"
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon}
                            alt=""
                        />
                    </div>
                    <ul className="text-lg flex flex-col items-center gap-2 mt-5 px-5 font-medium">
                        <NavLink onClick={() => setShowMenu(false)} to={"/"}>
                            <p className="px-4 py-2 rounded inline-block">
                                HOME
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={"/doctors"}
                        >
                            <p className="px-4 py-2 rounded inline-block">
                                DOCTORS
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={"/about"}
                        >
                            <p className="px-4 py-2 rounded inline-block">
                                ABOUT
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={"/contact"}
                        >
                            <p className="px-4 py-2 rounded inline-block">
                                CONTACT
                            </p>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAdminContext } from "../context/admin-context";
import axios from "axios";
import { toast } from "react-toastify";
import { useDoctorContext } from "../context/doctor-context";

const Login = () => {
    const [state, setState] = useState("admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAtoken, backendUrl } = useAdminContext();
    const { setDtoken } = useDoctorContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === "admin") {
                const { data } = await axios.post(backendUrl + "/admin/login", {
                    email,
                    password,
                });
                if (data.success) {
                    localStorage.setItem("atoken", data.token);
                    setAtoken(data.token);
                } else {
                    toast.error(data.message);
                }
            } else if (state === "doctor") {
                const { data } = await axios.post(
                    backendUrl + "/doctor/login",
                    {
                        email,
                        password,
                    }
                );
                console.log(data);

                if (data.success) {
                    localStorage.setItem("dtoken", data.token);
                    setDtoken(data.token);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {}
    };
    return (
        <form
            onSubmit={onSubmitHandler}
            className="min-h-[80vh] flex items-center"
        >
            <div className=" flex flex-col  gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-[#5e5e5e] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="capitalize text-primary">{state} </span>
                    Login
                </p>
                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="border border-[#DADADA] rounded w-full mt-1 p-2"
                        name="email"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="border border-[#DADADA] rounded w-full mt-1 p-2"
                        name="password"
                        required
                    />
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">
                    Login
                </button>
                {state === "admin" ? (
                    <p>
                        Doctor Login?
                        <span
                            className="cursor-pointer ml-1 text-primary font-medium underline"
                            onClick={() => setState("doctor")}
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Admin Login?
                        <span
                            className="cursor-pointer ml-1 text-primary font-medium underline"
                            onClick={() => setState("admin")}
                        >
                            Click here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;

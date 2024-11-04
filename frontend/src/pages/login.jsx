import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [state, setState] = useState("Sign Up");
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { token, setToken, backendUrl } = useAppContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === "Sign Up") {
                const { data } = await axios.post(
                    backendUrl + "/user/register",
                    { name, email, password }
                );

                if (data.success) {
                    localStorage.setItem("userToken", data.token);
                    setToken(data.token);
                    toast.success("Register Successfully");
                  
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + "/user/login", {
                    email,
                    password,
                });

                if (data.success) {
                    localStorage.setItem("userToken", data.token);
                    setToken(data.token);
                    toast.success("Login Successfully");
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [token]);
    return (
        <form
            onSubmit={onSubmitHandler}
            className="w-full min-h-[80vh] flex items-center "
        >
            <div className="flex flex-col m-auto gap-3 items-start p-9 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">
                    {state === "Sign Up" ? "Create Account" : "Log in"}
                </p>
                <p>
                    Please {state === "Sign Up" ? "Create Account" : "Log in"}{" "}
                    to book appointment
                </p>
                {state === "Sign Up" && (
                    <div className="w-full">
                        <p>Fullname</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white w-full py-2 rounded-md text-base"
                >
                    {state === "Sign Up" ? "Create Account" : "Login"}
                </button>
                {state === "Sign Up" ? (
                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => setState("Login")}
                            className="text-primary underline cursor-pointer  "
                        >
                            Login here
                        </span>
                    </p>
                ) : (
                    <p className="">
                        Create an account?{" "}
                        <span
                            onClick={() => setState("Sign Up")}
                            className="text-primary underline cursor-pointer  "
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

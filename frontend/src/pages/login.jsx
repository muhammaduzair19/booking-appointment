import React, { useState } from "react";

const Login = () => {
    const [state, setState] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <form
            onSubmit={onSubmit}
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
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">
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

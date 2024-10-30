import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/context";

const PaymentSuccessfull = () => {
    const { appointmentId } = useParams();
    const { backendUrl, token } = useAppContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const savePayment = async (appointmentId, sessionId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/user/save-payment",
                { appointmentId, sessionId },
                { headers: { token } }
            );
            console.log("data", data);

            if (data.success) {
                toast.success(data.message);
            } else {
                navigate(data.data.cancel_url);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        if (sessionId) {
            savePayment(appointmentId, sessionId);
        }
    }, [appointmentId]);
    return (
        <div className="w-full min-h-[50vh] flex justify-center items-center">
            <div className="min-w-[380px] py-2 bg-primary rounded-md">
                <div className="w-full h-full flex flex-col items-center gap-5 px-2 py-3">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="70"
                            height="70"
                            viewBox="0 0 24 24"
                            fill="white"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-badge-check"
                        >
                            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </span>
                    <h1 className="text-3xl text-white font-semibold ">
                        Payment Successfull
                    </h1>
                    <p className="font-black text-lg ">
                        You payment has been successfully paid
                    </p>
                    <p className="text-lg font-medium text-white">
                        For Appointment ID:{" "}
                        <span className="font-bold text-gray-200 text-xl">
                            {appointmentId}
                        </span>
                    </p>
                    <button
                        onClick={() => navigate("/my-appointment")}
                        className="w-full bg-white rounded-md py-2 font-medium cursor-pointer"
                    >
                        Back to Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessfull;

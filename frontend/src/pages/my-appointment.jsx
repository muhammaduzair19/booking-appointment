import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
    const { backendUrl, token } = useAppContext();
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/user/appointments",
                { headers: { token } }
            );
            if (data.success) {
                // console.log());

                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAppointments();
    }, [token]);

    return (
        <div>
            <p className="text-gray-600 font-medium">My Appointments</p>
            <div>
                {appointments.map((doc, index) => (
                    <div
                        key={doc._id}
                        className="w-full  border-gray-300 border-b flex justify-between px-3 pb-4 mt-10 flex-col gap-5 md:flex-row"
                    >
                        <div className="flex  items-center gap-4">
                            <img
                                className="w-44 rounded"
                                src={doc?.docData.image}
                                alt=""
                            />
                            <div className="flex flex-col">
                                <p className="text-2xl font-semibold text-neutral-900">
                                    {doc.docData.name}
                                </p>
                                <p className="font-medium text-gray-700 uppercase text-sm">
                                    {doc.docData.speciality
                                        .split("-")
                                        .join(" ")}
                                </p>
                                <p className="mt-2 font-medium text-gray-700">
                                    Address:
                                </p>
                                <p className="text-gray-500">
                                    {JSON.parse(doc.docData.address).line1}{" "}
                                    <br />{" "}
                                    {JSON.parse(doc.docData.address).line2}{" "}
                                    <br />{" "}
                                </p>

                                <p className="mt-2 text-gray-500 flex items-center gap-2">
                                    <span className="font-medium text-gray-800">
                                        Date & Time:{" "}
                                    </span>
                                    {doc.slotDate.split("_").join("-")} |{" "}
                                    {doc.slotTime}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end gap-3">
                            <button className="px-5 py-1 border border-gray-300 sm:min-w-32 rounded-sm hover:bg-primary hover:text-white transition-all duration-300">
                                {doc.payment ? "Paid" : "Pay"}
                            </button>
                            {!doc.isCompleted && (
                                <button className="px-5 py-1 border border-gray-300 sm:min-w-32 rounded-sm hover:bg-red-500 hover:text-white duration-300 transition-all">
                                    Cancel Appointment
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointment;

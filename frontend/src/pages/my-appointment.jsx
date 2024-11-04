import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
    const { backendUrl, token, getDoctorsData } = useAppContext();
    const [appointments, setAppointments] = useState([]);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const slotDateFormat = (date) => {
        const newDate = date.split("_");

        return `${newDate[0]} - ${months[Number(newDate[1]) - 1]} - ${
            newDate[2]
        }`;
    };
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/user/appointments",
                { headers: { token } }
            );
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appId) => {
        try {
            console.log(appId);
            const { data } = await axios.post(
                backendUrl + "/user/cancel-appointment",
                { appointmentId: appId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDoctorsData();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const onlinePayment = async (appId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/user/payment",
                { appointmentId: appId },
                { headers: { token } }
            );

            if (data.success) {
                console.log(data.sessionUrl);

                window.open(data.data.sessionUrl);
            } else {
                toast.error(data.message);
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
                {appointments.map((doc) => {
                    return (
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
                                        {doc.docData.address}
                                    </p>

                                    <p className="mt-2 text-gray-500 flex items-center gap-2">
                                        <span className="font-medium text-gray-800">
                                            Date & Time:{" "}
                                        </span>
                                        {slotDateFormat(doc.slotDate)}
                                        {" | "}
                                        {doc.slotTime}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end gap-3">
                                {!doc.cancelled &&
                                    !doc.isCompleted &&
                                    doc.payment && (
                                        <p
                                            className={` px-5 py-1 border border-gray-300 sm:min-w-32 rounded-sm text-white bg-green-600 text-center`}
                                        >
                                            Paid!
                                        </p>
                                    )}

                                {!doc.payment &&
                                    !doc.isCompleted &&
                                    !doc.cancelled && (
                                        <button
                                            onClick={() =>
                                                onlinePayment(doc._id)
                                            }
                                            className={` px-5 py-1 border border-gray-300 sm:min-w-32 rounded-sm hover:bg-primary hover:text-white transition-all duration-300`}
                                        >
                                            Pay
                                        </button>
                                    )}

                                {!doc.isCompleted && !doc.cancelled && (
                                    <button
                                        onClick={() =>
                                            cancelAppointment(doc._id)
                                        }
                                        className="px-5 py-1 border border-gray-300 sm:min-w-32 rounded-sm hover:bg-red-500 hover:text-white duration-300 transition-all"
                                    >
                                        Cancel Appointment
                                    </button>
                                )}
                                {doc.cancelled && (
                                    <p className="px-5 py-1 border border-red-700 sm:min-w-32 rounded-sm text-red-600 duration-300 transition-all">
                                        Appointment cancelled
                                    </p>
                                )}

                                {doc.isCompleted && (
                                    <button className="px-5 py-1 border border-green-700 sm:min-w-32 rounded-sm text-green-600 duration-300 transition-all">
                                        Completed
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyAppointment;

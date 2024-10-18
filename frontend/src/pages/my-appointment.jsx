import React from "react";
import { useAppContext } from "../context/context";

const MyAppointment = () => {
    const { doctors } = useAppContext();
    return (
        <div>
            <p className="text-gray-600 font-medium" >My Appointments</p>
            <div>
                {doctors.slice(0, 3).map((doc, index) => (
                    <div className="w-full  border-gray-300 border-b flex justify-between px-3 pb-4 mt-10 flex-col gap-5 md:flex-row">
                        <div className="flex  items-center">
                            <img
                                className="w-44 rounded"
                                src={doc.image}
                                alt=""
                            />
                            <div className="flex flex-col">
                                <p className="text-2xl font-semibold text-neutral-900">
                                    {doc.name}
                                </p>
                                <p className="font-medium text-gray-700 uppercase text-sm">
                                    {doc.speciality.split("-").join(" ")}
                                </p>
                                <p className="mt-2 font-medium text-gray-700">
                                    Address:
                                </p>
                                <p className="text-gray-500">
                                    {doc?.address.line1} <br />{" "}
                                    {doc.address.line2}{" "}
                                </p>

                                <p className="mt-2 text-gray-500 flex items-center gap-2">
                                    <span className="font-medium text-gray-800">
                                        Date & Time:{" "}
                                    </span>
                                    2024-10-22 | 30:00
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end gap-3">
                            <button className="px-5 py-1 border border-gray-300 sm:min-w-32 rounded-sm hover:bg-primary hover:text-white transition-all duration-300">
                                Pay
                            </button>
                            <button className="px-5 py-1 border border-gray-300 sm:min-w-32 rounded-sm hover:bg-red-500 hover:text-white duration-300 transition-all">
                                Cancel Appointment
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointment;

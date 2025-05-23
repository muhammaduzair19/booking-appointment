import React, { useEffect } from "react";
import { useAdminContext } from "../../context/admin-context";
import { useAppContext } from "../../context/context";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
    const { appointments, getAllAppointments, atoken, cancelAppointment } =
        useAdminContext();
    const { calculateAge, slotDateFormat, currency } = useAppContext();

    useEffect(() => {
        if (atoken) {
            getAllAppointments();
        }
    }, [atoken]);

    return (
        <div className="w-full max-w-6xl m-5">
            <p className="mb-3 text-lg font-medium">All Appointments</p>
            <div className="bg-white rounded-md overflow-y-scroll text-sm max-h-[80vh] min-h-[60vh] w-full">
                <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1.5fr_1fr] grid-flow-col py-3 px-6 border-b w-full">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Dr.</p>
                    <p>Fee</p>
                    <p>Action</p>
                </div>
                {appointments?.reverse()?.map((item, index) => {
                    console.log(item);

                    return (
                        <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1.5fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100">
                            <p className="max-sm:hidden">{index + 1}</p>
                            <div className="flex items-center gap-2">
                                <img
                                    className="w-8 rounded-full"
                                    src={item.userData?.image}
                                    alt=""
                                />
                                <p>{item.userData?.name}</p>
                            </div>
                            <p className="max-sm:hidden">
                                {calculateAge(item.userData.dateOfBirth)}
                            </p>
                            <p>
                                {slotDateFormat(item.slotDate)} ,{" "}
                                {item.slotTime}
                            </p>
                            <div className="flex items-center gap-2">
                                <img
                                    className="w-8 rounded-full"
                                    src={item.docData?.image}
                                    alt=""
                                />
                                <p>{item.docData?.name}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <p>
                                    {currency} {item.amount}
                                </p>
                                {item.payment && (
                                    <span className="text-xs border border-green-400 px-3 text-white bg-green-800 py-0.5 rounded-full">
                                        Paid
                                    </span>
                                )}
                            </div>
                            {item.cancelled ? (
                                <p className="text-red-400 text-xs font-medium">
                                    Cancelled
                                </p>
                            ) : item.isCompleted ? (
                                <p className="text-green-600 text-xs font-medium">
                                    Completed
                                </p>
                            ) : (
                                <img
                                    onClick={() => cancelAppointment(item._id)}
                                    className="w-10 cursor-pointer"
                                    src={assets.cancel_icon}
                                    alt=""
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllAppointments;

import React, { useEffect } from "react";
import { useDoctorContext } from "../../context/doctor-context";
import { useAppContext } from "../../context/context";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
    const {
        dtoken,
        appointments,
        cancelAppointment,
        completeAppointment,
        getAppointments,
    } = useDoctorContext();
    const { calculateAge, slotDateFormat, currency } = useAppContext();
    useEffect(() => {
        if (dtoken) {
            getAppointments();
        }
    }, [dtoken]);
    return (
        <div className="m-5 w-full max-w-6xl">
            <p className="mb-3 text-lg font-medium">All Appointments</p>
            <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>
                {appointments?.reverse()?.map((item, index) => (
                    <div
                        className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                        key={item._id}
                    >
                        <p className="max-sm:hidden">{index + 1}</p>
                        <div className="flex items-center gap-2">
                            <img
                                className="w-8 rounded-full"
                                src={item.userData.image}
                                alt=""
                            />
                            <p>{item.userData.name}</p>
                        </div>
                        <span>
                            <p className="text-xs inline-block px-3 uppercase p-0.5 border-primary rounded-full border">
                                {item.payment ? "Online" : "Cash"}
                            </p>
                        </span>
                        <p className="max-sm:hidden">
                            {calculateAge(item.userData.dateOfBirth)}
                        </p>
                        <p>
                            {slotDateFormat(item.slotDate)}, {item.slotTime}
                        </p>
                        <p>{currency + item.amount}</p>
                        {item.isCompleted ? (
                            <p className="font-medium text-green-600 text-xs">
                                Completed
                            </p>
                        ) : item.cancelled ? (
                            <p className="font-medium text-red-600 text-xs">
                                Cancelled
                            </p>
                        ) : (
                            <div className="flex items-center gap-2">
                                <img
                                    onClick={() => cancelAppointment(item._id)}
                                    className="w-10 cursor-pointer"
                                    src={assets.cancel_icon}
                                    alt=""
                                />
                                <img
                                    onClick={() =>
                                        completeAppointment(item._id)
                                    }
                                    className="w-10 cursor-pointer"
                                    src={assets.tick_icon}
                                    alt=""
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointment;

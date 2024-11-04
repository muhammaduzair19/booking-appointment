import React, { useEffect } from "react";
import { useDoctorContext } from "../../context/doctor-context";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/context";

const DoctorDashboard = () => {
    const {
        getDashboardData,
        dtoken,
        dashboardData,
        completeAppointment,
        cancelAppointment,
    } = useDoctorContext();
    const { slotDateFormat, currency } = useAppContext();

    useEffect(() => {
        if (dtoken) {
            getDashboardData();
        }
    }, [dtoken]);
    return (
        dashboardData && (
            <div className="m-5">
                <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer border-gray-100 hover:scale-110 transition-all duration-300">
                        <img
                            className="w-14"
                            src={assets.earning_icon}
                            alt=""
                        />
                        <div>
                            <p className="text-xl font-semibold text-gray-600">
                                {dashboardData.earnings}
                                {currency}
                            </p>
                            <p className="text-gray-400">Earnings</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border cursor-pointer border-gray-100 hover:scale-110 transition-all duration-300">
                        <img
                            className="w-14"
                            src={assets.appointments_icon}
                            alt=""
                        />
                        <div>
                            <p className="text-xl font-semibold text-gray-600">
                                {dashboardData.appointments}
                            </p>
                            <p className="text-gray-400">Appoitments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border cursor-pointer border-gray-100 hover:scale-110 transition-all duration-300">
                        <img
                            className="w-14"
                            src={assets.patients_icon}
                            alt=""
                        />
                        <div>
                            <p className="text-xl font-semibold text-gray-600">
                                {dashboardData.patients}
                            </p>
                            <p className="text-gray-400">Patients</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border">
                        <img src={assets.list_icon} alt="" />
                        <p className="font-semibold">Latest Bookings</p>
                    </div>
                    <div className="pt-4 border border-t-0">
                        {dashboardData.latestAppointments?.map(
                            (item, index) => (
                                <div
                                    className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100"
                                    key={index}
                                >
                                    <img
                                        className="w-10 rounded-full"
                                        src={item.userData.image}
                                        alt=""
                                    />
                                    <div className="flex-1 text-sm">
                                        <p className="text-gray-800 font-medium">
                                            {item.userData.name}
                                        </p>
                                        <p className="text-gray-600">
                                            {slotDateFormat(item.slotDate)}
                                        </p>
                                    </div>
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
                                                onClick={() =>
                                                    cancelAppointment(item._id)
                                                }
                                                className="w-10 cursor-pointer"
                                                src={assets.cancel_icon}
                                                alt=""
                                            />
                                            <img
                                                onClick={() =>
                                                    completeAppointment(
                                                        item._id
                                                    )
                                                }
                                                className="w-10 cursor-pointer"
                                                src={assets.tick_icon}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default DoctorDashboard;

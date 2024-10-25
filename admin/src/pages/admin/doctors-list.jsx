import React, { useEffect } from "react";
import { useAdminContext } from "../../context/admin-context";

const DoctorsList = () => {
    const { getAllDoctors, atoken, doctors, changeAvailability } =
        useAdminContext();
    useEffect(() => {
        if (atoken) {
            getAllDoctors();
        }
    }, [atoken]);
    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
            <h1 className="text-lg font-medium">All Doctors</h1>
            <div className="w-full flex  flex-wrap gap-4 mt-5 gap-y-6">
                {doctors?.map((doctor) => (
                    <div
                        className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
                        key={doctor._id}
                    >
                        <img
                            className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                            src={doctor.image}
                            alt=""
                        />
                        <div className="p-4">
                            <p className="text-neutral-800 text-lg font-medium">
                                {doctor.name}
                            </p>
                            <p className="text-zinc-600 text-sm capitalize">
                                {doctor.speciality.split("-").join(" ")}
                            </p>
                            <div className="mt-2 flex items-center gap-1 cursor-pointer text-sm">
                                <input
                                    onChange={() =>
                                        changeAvailability(doctor._id)
                                    }
                                    type="checkbox"
                                    checked={doctor.available}
                                />
                                <p>Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;

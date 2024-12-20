import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/context";

const Doctors = () => {
    const { doctors } = useAppContext();
    const navigate = useNavigate();
    const { speciality } = useParams();

    const [filteredDoc, setFilteredDoc] = useState([]);
    const [showFilter, setShowFilters] = useState(false);

    const getFilteredDoctors = (doctors) => {
        if (speciality) {
            const filtered = doctors?.filter(
                (doctor) => doctor.speciality === speciality
            );
            setFilteredDoc(filtered);
        } else {
            setFilteredDoc(doctors);
        }
    };

    useEffect(() => {
        getFilteredDoctors(doctors);
    }, [speciality]);

    const specialities = [
        "general-physician",
        "gynecologist",
        "dermatologist",
        "pediatricians",
        "neurologist",
        "gastroenterologist",
    ];
    return filteredDoc.length > 0 ? (
        <div>
            <p className="text-gray-600">
                Browse through the doctors specialist
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-10  mt-5">
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className={`capitalize py-1 px-3 border rounded text-sm transition-all sm:hidden ${
                        showFilter ? "bg-primary text-white" : ""
                    }`}
                >
                    filters
                </button>
                <div
                    className={`flex-col text-gray-600 text-sm gap-4 ${
                        showFilter ? "flex" : " hidden sm:flex"
                    }`}
                >
                    {specialities?.map((s) => (
                        <p
                            key={s}
                            onClick={() => {
                                speciality === s
                                    ? navigate("/doctors")
                                    : navigate(`/doctors/${s}`);
                            }}
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer capitalize ${
                                speciality === s
                                    ? "bg-indigo-100 text-black"
                                    : ""
                            }`}
                        >
                            {s.split("-").join(" ")}
                        </p>
                    ))}
                </div>
                <div className="w-full grid grid-cols-auto gap-4 space-y-6 place-items-center">
                    {filteredDoc.length > 0 ? (
                        filteredDoc?.map((item, idx) => (
                            <div
                                onClick={() =>
                                    navigate(`/appointment/${item._id}`)
                                }
                                key={idx}
                                className={`border border-blue-200 rounded-xl overflow-hidden  cursor-pointer hover:translate-y-[-14px] transition-all duration-500 -mb-5`}
                            >
                                <img
                                    className="bg-blue-50"
                                    src={item.image}
                                    alt=""
                                />
                                <div className="p-4">
                                    <div className="flex items-center gap-3 text-sm text-center text-green-600">
                                        <p
                                            className={`w-3 h-3 rounded-full ${
                                                item.available
                                                    ? "bg-green-500 "
                                                    : "bg-red-500 "
                                            }`}
                                        ></p>
                                        <p
                                            className={`${
                                                item.available
                                                    ? "text-green-500 "
                                                    : "text-red-500 "
                                            }`}
                                        >
                                            {item.available
                                                ? "Available"
                                                : "Not Available"}
                                        </p>
                                    </div>
                                    <p className="text-gray-900 text-lg font-medium w-full truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-gray-600 text-sm capitalize">
                                        {item.speciality.split("-").join(" ")}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No Doctor Available</h1>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div>
            <p className="text-gray-600">
                Browse through the doctors specialist
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-10  mt-5">
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className={`capitalize py-1 px-3 border rounded text-sm transition-all sm:hidden ${
                        showFilter ? "bg-primary text-white" : ""
                    }`}
                >
                    filters
                </button>
                <div
                    className={`flex-col text-gray-600 text-sm gap-4 ${
                        showFilter ? "flex" : " hidden sm:flex"
                    }`}
                >
                    {specialities?.map((s) => (
                        <p
                            key={s}
                            onClick={() => {
                                speciality === s
                                    ? navigate("/doctors")
                                    : navigate(`/doctors/${s}`);
                            }}
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer capitalize ${
                                speciality === s
                                    ? "bg-indigo-100 text-black"
                                    : ""
                            }`}
                        >
                            {s.split("-").join(" ")}
                        </p>
                    ))}
                </div>
                <div className="text-center w-full text-sm font-medium text-gray-700">
                    No Doctor Available with this speciality
                </div>
            </div>
        </div>
    );
};

export default Doctors;

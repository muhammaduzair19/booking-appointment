import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/context";

const Doctors = () => {
    const navigate = useNavigate();
    const { speciality } = useParams();
    const { doctors } = useAppContext();
    const [filteredDoc, setFilteredDoc] = useState([]);
    const [showFilter, setShowFilters] = useState(false);

    const getFilteredDoctors = () => {
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
        getFilteredDoctors();
    }, [speciality]);
    const specialities = [
        "general-physician",
        "gynecologist",
        "dermatologist",
        "pediatracians",
        "neurologist",
        "gastroenterologist",
    ];
    return (
        <div>
            <p className="text-gray-600">
                Brows through the doctors specialist
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
                    {filteredDoc?.map((item, idx) => (
                        <div
                            onClick={() => navigate(`/appointment/${item._id}`)}
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
                                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                    <p>Available</p>
                                </div>
                                <p className="text-gray-900 text-lg font-medium w-full truncate">
                                    {item.name}
                                </p>
                                <p className="text-gray-600 text-sm capitalize">
                                    {item.speciality.split("-").join(" ")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;

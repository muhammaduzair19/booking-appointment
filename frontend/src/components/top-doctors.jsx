import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useAppContext();
    return (
        <div className="flex items-center flex-col gap-4 my-16 text-gray-900 md:mx-10 ">
            <h1 className="text-3xl font-medium">Top Doctors To Book</h1>
            <p className="sm:w-1/3 text-center text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0  ">
                {doctors?.slice(0, 10).map((item, idx) => (
                    <div
                        onClick={() => navigate(`/appointment/${item._id}`)}
                        key={idx}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-14px] transition-all duration-500"
                    >
                        <img className="bg-blue-50" src={item.image} alt="" />
                        <div className="p-4">
                            <div className="flex items-center gap-3 text-sm text-center text-green-600">
                                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                <p>Available</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">
                                {item.name}
                            </p>
                            <p className="text-gray-600 text-sm capitalize">
                                {item.speciality.split("-").join(" ")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => {
                    navigate("/doctors");
                    scrollTo(0, 0);
                }}
                className="px-12 py-3 bg-blue-50 text-gray-600 mt-10 rounded-full"
            >
                More
            </button>
        </div>
    );
};

export default TopDoctors;

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
    const { doctors } = useAppContext();
    const navigate = useNavigate();
    const [relatedDoc, setRelatedDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const relDoc = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            );

            setRelatedDoc(relDoc);
        }
    }, [docId, doctors, speciality]);

    return (
        <div className="flex items-center flex-col gap-4 my-16 text-gray-900 md:mx-10 ">
            <h1 className="text-3xl font-medium">Related Doctors</h1>
            <p className="sm:w-1/3 text-center text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0  ">
                {relatedDoc?.slice(0, 5).map((item, idx) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            scrollTo(0, 0);
                        }}
                        key={idx}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-14px] transition-all duration-500"
                    >
                        <img className="bg-blue-50" src={item.image} alt="" />
                        <div className="p-4">
                            <div className="flex items-center gap-3 text-sm text-center">
                                <p
                                    className={`w-3 h-3 rounded-full ${
                                        item.available
                                            ? "bg-green-600"
                                            : "bg-red-500"
                                    } `}
                                ></p>
                                <p
                                    className={
                                        item.available
                                            ? "text-green-600"
                                            : "text-red-500"
                                    }
                                >
                                    {!item.available && "Not"} Available
                                </p>
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

export default RelatedDoctors;

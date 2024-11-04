import React, { createRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/context";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/related-doctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, backendUrl, currencySymbol, token, getDoctorsData } =
        useAppContext();
    const [docInfo, setDocInfo] = useState({});
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");
    const navigate = useNavigate();
    const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

    const getDocInfo = () => {
        const filteredDocInfo = doctors?.find((doc) => doc._id === docId);
        setDocInfo(filteredDocInfo);
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);

        // getting current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            // getting date with index
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            //setting time of the date with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(18, 0, 0, 0);

            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                );
                currentDate.setMinutes(currentDate.getDate() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;

                const slotTime = formattedTime;
                console.log(docInfo?.slots_booked);

                const isSlotAvailable =
                    docInfo?.slots_booked[slotDate] &&
                    docInfo?.slots_booked[slotDate].includes(slotTime)
                        ? false
                        : true;

                if (isSlotAvailable) {
                    timeSlots.push({
                        date: new Date(currentDate),
                        time: formattedTime,
                    });
                }

                //increase time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 45);
            }

            setDocSlots((p) => [...p, timeSlots]);
        }
    };

    useEffect(() => {
        getDocInfo();
    }, [docId, doctors]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Login to book appointment");
            localStorage.removeItem("token");
            return navigate("/login");
        }
        try {
            const date = docSlots[slotIndex][0].date;
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + "_" + month + "_" + year;
            const { data } = await axios.post(
                backendUrl + "/user/book-appointment",
                { docId, slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate("/my-appointment");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        docInfo && (
            <div>
                {/* ------------DR DETAILS------------- */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                        <img
                            src={docInfo.image}
                            alt=""
                            className="bg-primary w-full md:max-w-72 rounded-lg"
                        />
                    </div>
                    <div className="flex-1 border border-gray-400 rounded-lg py-6 px-8  bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ">
                        {/* DOC INFO */}
                        <p className="flex items-center gap-2 text-gray-900 text-2xl font-medium">
                            {docInfo.name}
                            <img
                                className="w-5"
                                src={assets.verified_icon}
                                alt=""
                            />
                        </p>
                        <div className=" flex items-center gap-2 text-sm mt-1 text-gray-600 uppercase">
                            <p>
                                {docInfo.degree} - {docInfo.speciality}
                            </p>
                            <button className="py-0.5 px-2 border text-xs rounded-full">
                                {docInfo.experience}
                            </button>
                        </div>

                        {/* DR ABOUT */}
                        <div>
                            <p className="flex items-center gap-1 text-base font-medium text-gray-600 mt-3">
                                About
                                <img src={assets.info_icon} alt="" />
                            </p>
                            <p className="text-base text-gray-500 max-w-[700px] mt-1">
                                {docInfo.about}
                            </p>
                        </div>
                        <p className=" text-gray-400 font-medium mt-2">
                            Appointment fee{" "}
                            <span className="text-gray-600">
                                {currencySymbol} {docInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>
                {/* BOOKING SLOTS */}
                <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                    <p>Booking Slots</p>
                    <div className="flex gap-3 items-center w-full overflow-x-scroll  mt-4">
                        {docSlots.length &&
                            docSlots?.map((slot, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSlotIndex(idx)}
                                    className={`text-center rounded-full py-6 min-w-16 cursor-pointer ${
                                        slotIndex === idx
                                            ? "bg-primary text-white"
                                            : " border border-gray-200"
                                    }`}
                                >
                                    <p>
                                        {slot[0] &&
                                            daysOfWeek[slot[0].date.getDay()]}
                                    </p>
                                    <p>{slot[0] && slot[0].date.getDate()}</p>
                                </div>
                            ))}
                    </div>
                    <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                        {docSlots?.length &&
                            docSlots[slotIndex].map((time, idx) => (
                                <p
                                    onClick={() => setSlotTime(time.time)}
                                    key={idx}
                                    className={`text-sm font-light flex-shrink-0 border  px-5 py-2 rounded-full cursor-pointer ${
                                        time.time === slotTime
                                            ? "bg-primary text-white"
                                            : "text-gray-400 border border-gray-300"
                                    }`}
                                >
                                    {time.time.toLowerCase()}
                                </p>
                            ))}
                    </div>
                    <button
                        onClick={bookAppointment}
                        className="bg-primary text-white text-sm font-light  px-14 py-3 rounded-full my-6 cursor-pointer"
                    >
                        Book an Appointement
                    </button>
                </div>

                {/* LISTING RELATED DOCTORS */}
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
        )
    );
};

export default Appointment;

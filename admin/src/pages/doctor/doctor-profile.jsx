import React, { useEffect, useState } from "react";
import { useDoctorContext } from "../../context/doctor-context";
import { useAppContext } from "../../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const { dtoken, getProfileData, backendUrl, setProfileData, profileData } =
        useDoctorContext();
    const { currency } = useAppContext();

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available,
            };

            const { data } = await axios.post(
                backendUrl + "/doctor/update",
                updateData,
                { headers: { dtoken } }
            );
            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (dtoken) {
            getProfileData();
        }
    }, [dtoken]);
    return (
        profileData && (
            <div>
                <div className="flex flex-col gap-4 m-5">
                    <div>
                        <img
                            className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
                            src={profileData.image}
                            alt=""
                        />
                    </div>
                    <div className="flex-1 border border-stone-100 rounded-lg px-8 py-7 bg-white">
                        {/* DOC INFO */}
                        <p className="font-medium text-3xl text-gray-700">
                            {profileData.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-gray-600">
                            <p className="capitalize">
                                {profileData.degree} -{" "}
                                {profileData.speciality.split("-").join(" ")}
                            </p>
                            <button className="py-0.5 px-2 border text-xs rounded-full">
                                {profileData.experience}
                            </button>
                        </div>

                        {/* about */}
                        <div>
                            <p className="gap-1 text-sm font-medium text-neutral-800 mt-3">
                                About:
                            </p>
                            <p className="text-sm text-gray-600 max-w-[700px] mt-2">
                                {profileData.about}
                            </p>
                        </div>

                        <p className="text-gray-600 font-medium mt-4">
                            Appointment Fee:
                            <span className="text-gray-800">
                                {" "}
                                {currency}
                                {isEdit ? (
                                    <input
                                        type="number"
                                        value={profileData.fees}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                fees: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    profileData.fees
                                )}
                            </span>
                        </p>
                        <div className="flex gap-2 py-2">
                            <p>Address:</p>
                            <p className="text-sm">
                                {isEdit ? (
                                    <input
                                        type="text"
                                        value={
                                            JSON.parse(profileData.address)
                                                .line1
                                        }
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line1: JSON.stringify(
                                                        e.target.value
                                                    ),
                                                },
                                            }))
                                        }
                                    />
                                ) : (
                                    JSON.parse(profileData.address).line1
                                )}
                                <br />
                                {isEdit ? (
                                    <input
                                        type="text"
                                        value={
                                            JSON.parse(profileData.address)
                                                .line2
                                        }
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line2: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                ) : (
                                    JSON.parse(profileData.address).line2
                                )}
                            </p>
                        </div>
                        <div className="flex gap-1 pt-2">
                            <input
                                oncChange={() =>
                                    isEdit &&
                                    setProfileData((prev) => ({
                                        ...prev,
                                        available: !profileData.available,
                                    }))
                                }
                                checked={profileData.available}
                                type="checkbox"
                                name=""
                            />
                            <label htmlFor="">Available</label>
                        </div>
                        {isEdit ? (
                            <button
                                onClick={updateProfile}
                                className=" px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className=" px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default DoctorProfile;

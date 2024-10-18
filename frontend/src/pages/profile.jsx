import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const Profile = () => {
    const [userData, setUserData] = useState({
        name: "Ed Kemper",
        image: assets.profile_pic,
        email: "edkemper@gmail.com",
        phone: "+9232939 2384",
        address: {
            line1: "St. Cross, Richmond",
            line2: "43th Street, Dc",
        },
        gender: "Male",
        dateOfBirth: "2001-12-19",
    });

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="max-w-lg flex flex-col gap-2 text-sm md:text-base">
            <img className="w-36 rounded" src={userData.image} alt="" />
            {isEdit ? (
                <input
                    className="bg-gray-50 text-3xl font-medium max-w-60 mt-4  border border-zinc-400 py-1 px-2"
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
            ) : (
                <p className="font-medium text-3xl text-neutral-800 mt-4">
                    {" "}
                    {userData.name}
                </p>
            )}
            <hr className="bg-zinc-600 h-[1px] border-none" />
            <div>
                <p className="uppercase text-neutral-500 underline mt-4">
                    Contact Information
                </p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Email: </p>
                    <p className="text-blue-500">{userData.email}</p>
                    <p className="font-medium">Phone:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-50 max-w-52 border border-zinc-400 py-1 px-2"
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p className="text-blue-400 ">{userData.phone}</p>
                    )}
                    <p className="font-medium">Address:</p>
                    {isEdit ? (
                        <p>
                            <input
                                className="bg-gray-50 border border-zinc-400 py-1 mb-4 px-2"
                                type="text"
                                name="address1"
                                value={userData.address.line1}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        address: {
                                            ...prev.address,
                                            line1: e.target.value,
                                        },
                                    }))
                                }
                            />
                            <br />
                            <input
                                className="bg-gray-50 border border-zinc-400 py-1 px-2"
                                type="text"
                                name="address2"
                                value={userData.address.line2}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        address: {
                                            ...prev.address,
                                            line2: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </p>
                    ) : (
                        <p className="text-gray-500">
                            {userData.address.line1}
                            <br />
                            {userData.address.line2}
                        </p>
                    )}
                </div>
            </div>
            <div>
                <p className="uppercase text-neutral-500 underline mt-4">
                    Basic Information
                </p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium"> Gender:</p>
                    {isEdit ? (
                        <select
                            className="bg-gray-50 max-w-20 border border-zinc-400 py-1 mb-4 px-2"
                            name="gender"
                            value={userData.gender}
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    gender: e.target.value,
                                }))
                            }
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p>{userData.gender}</p>
                    )}
                    <p className="font-medium">Birthday:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-50 border border-zinc-400 py-1 mb-4 px-2"
                            type="date"
                            name="dateOfBirth"
                            value={userData.dateOfBirth}
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    dateOfBirth: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p>{userData.dateOfBirth}</p>
                    )}
                </div>
            </div>
            <div className="mt-10">
                {isEdit ? (
                    <button
                        className="px-6 py-2 rounded-full border border-primary hover:bg-primary hover:text-white transition-all duration-500"
                        onClick={() => setIsEdit(false)}
                    >
                        Save Information
                    </button>
                ) : (
                    <button
                        className="px-6 py-2 rounded-full border border-primary hover:bg-primary hover:text-white transition-all duration-500"
                        onClick={() => setIsEdit(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;

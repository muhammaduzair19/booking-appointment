import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/admin-context";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Years");
    const [fees, setFees] = useState("");
    const [about, setAbout] = useState("");
    const [speciality, setSpeciality] = useState("general-physician");
    const [degree, setDegree] = useState("");
    const [address, setAddress] = useState("");

    const { backendUrl, atoken } = useAdminContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!docImg) {
                return toast.error("Image not selected");
            }
            const formData = new FormData();
            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", Number(fees));
            formData.append("about", about);
            formData.append("speciality", speciality);
            formData.append("degree", degree);
            formData.append("address", address);

            ///console
            formData.forEach((value, key) => {
                console.log(`${key} :${value}`);
            });

            const { data } = await axios.post(
                backendUrl + "/admin/add-doctor",
                formData,
                { headers: { atoken } }
            );
            if (data.success) {
                toast.success(data.message);
                setDocImg(false);
                setName("");
                setEmail("");
                setPassword("");
                setFees("");
                setAbout("");
                setDegree("");
                setAddress1("");
                setAddress2("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <form className="m-4 w-full" onSubmit={onSubmitHandler}>
            <p className="mb-2 text-lg font-medium">Add Doctor</p>
            <div className="bg-white p-8 border rounded w-full max-w-4xl max-h-[90vh] overflow-y-scroll">
                <div className="flex items-center gap-5  mb-8 text-gray-500">
                    <label htmlFor="docImage" className="cursor-pointer">
                        <img
                            className="w-16 bg-gray-100 rounded-full cursor-pointer"
                            src={
                                docImg
                                    ? URL.createObjectURL(docImg)
                                    : assets.upload_area
                            }
                            alt=""
                        />
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setDocImg(e.target.files[0])}
                        id="docImage"
                        hidden
                    />
                    <p>Upload Doctor Picture</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Doctor Name</p>
                            <input
                                className="border rounded px-3 py-2"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Doctor Email</p>
                            <input
                                className="border rounded px-3 py-2"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Doctor Email"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Doctor Password</p>
                            <input
                                className="border rounded px-3 py-2"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Experience</p>
                            <select
                                className="border rounded px-3 py-2"
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                                name=""
                                id=""
                            >
                                <option value="1 Years">1 Years</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="5 Years">6 Years</option>
                                <option value="6 Years">7 Years</option>
                                <option value="7 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                                <option value="10+ Years">10+ Years</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Fees</p>
                            <input
                                className="border rounded px-3 py-2"
                                onChange={(e) => setFees(e.target.value)}
                                value={fees}
                                type="number"
                                placeholder="Fees"
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Speciality</p>
                            <select
                                className="border rounded px-3 py-2"
                                onChange={(e) => setSpeciality(e.target.value)}
                                value={speciality}
                                name=""
                                id=""
                            >
                                <option value="general-physician">
                                    General Physician
                                </option>
                                <option value="gynecologist">
                                    Gynecologist
                                </option>
                                <option value="dermatologist">
                                    Dermatologist
                                </option>
                                <option value="neurologist">Neurologist</option>
                                <option value="gastroenterologist">
                                    Gastroenterologist
                                </option>
                                <option value="pediatricians">
                                    Pediatricians
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Education</p>
                            <input
                                className="border rounded px-3 py-2"
                                onChange={(e) => setDegree(e.target.value)}
                                value={degree}
                                type="text"
                                placeholder="Education"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Address</p>
                            <textarea
                                className="border w-full rounded px-3 py-2"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                rows={3}
                                placeholder="Address"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mt-4 mb-2">About Doctor</p>
                    <textarea
                        className="w-full px-4 pt-2 border rounded"
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                        placeholder="Write about doctor"
                        rows={5}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white text-sm  mt-4 mb-3 px-10 py-2 rounded-full"
                >
                    Add Doctor
                </button>
            </div>
        </form>
    );
};

export default AddDoctor;

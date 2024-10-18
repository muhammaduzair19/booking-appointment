import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
    return (
        <div>
            <div className="text-center text-2xl text-gray-600 pt-10">
                <p>
                    CONTACT{" "}
                    <span className="text-gray-700 font-semibold">US</span>
                </p>
            </div>
            <div className=" my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 text-sm">
                <img
                    className="w-full md:max-w-[360px]"
                    src={assets.contact_image}
                    alt=""
                />
                <div className="flex flex-col justify-center items-start gap-6">
                    <p className="text-lg text-gray-600 font-semibold">
                        OUR OFFICE
                    </p>
                    <p className="text-gray-500">
                        3444 Williams Station <br /> Suite, 350, Washington, USA
                    </p>
                    <p className="text-gray-500">
                        Tel: (021) 343-3432 <br /> Email: uzairu@fmail.com
                    </p>
                    <p className="text-lg text-gray-600 font-semibold">
                        Careers at prescripto
                    </p>
                    <p>Learn more about our teams and job openings</p>
                    <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
                        Explore Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;

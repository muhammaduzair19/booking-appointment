import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  my-10 mt-40 text-sm">
                {/* LEFT */}
                <div>
                    <img className="w-40 mb-5" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Quasi sunt eaque, delectus corporis velit eum!
                        Impedit nihil vel, voluptate accusantium consequatur
                        molestiae! Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Repudiandae.
                    </p>
                </div>

                {/* CENTER */}
                <div>
                    <p className="uppercase text-xl font-medium mb-5">
                        Company
                    </p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* RIGHT */}
                <div>
                    <p className="uppercase text-xl font-medium mb-5">
                        Get in touch
                    </p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li> +92 32093 32802</li>
                        <li>sdfgskfh@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* COPY RIGHT TEXT */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright &copy; 2024 Prescript - All Rightes Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;

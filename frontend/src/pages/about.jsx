import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>
                    ABOUT{" "}
                    <spa n className="text-gray-700 font-medium">
                        US
                    </spa>
                </p>
            </div>
            <div className="flex flex-col  my-10  md:flex-row gap-12">
                <img
                    className="w-full md:max-w-[360px]"
                    src={assets.about_image}
                    alt=""
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Error nemo alias in quia exercitationem ullam ea
                        unde totam blanditiis. Voluptatem deserunt iste
                        voluptates, repellat, facilis, cumque culpa voluptas
                        iusto possimus excepturi itaque dolor.
                    </p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Excepturi explicabo esse repellendus dolores
                        tempore ipsam. Quam voluptatibus aut eius et amet
                        blanditiis excepturi deleniti corporis!
                    </p>
                    <b className="text-gray-600">Our Vision</b>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, minima pariatur! Iure libero debitis odio
                        aspernatur autem laborum temporibus hic nesciunt!
                        Aliquid ratione aliquam et sunt recusandae facilis,
                        inventore optio.
                    </p>
                </div>
            </div>
            <div className="text-xl my-4">
                <p>
                    WHY{" "}
                    <span className="text-gray-700 font-semibold">
                        CHOOSE US
                    </span>
                </p>
                <div className="flex flex-col md:flex-row mb-20 mt-10">
                    <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                        <b>Efficiency</b>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Nam aperiam suscipit quis?
                        </p>
                    </div>
                    <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                        <b>Convenience</b>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Voluptatum.
                        </p>
                    </div>
                    <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                        <b>Personalization</b>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Suscipit, debitis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

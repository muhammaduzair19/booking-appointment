import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const [appointments, setAppointments] = useState();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dtoken, setDtoken] = useState(() => {
        try {
            const token = localStorage.getItem("dtoken");
            return token ? token : "";
        } catch (error) {
            console.log(error);
            return "";
        }
    });

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/doctor/appointments",
                { headers: { dtoken } }
            );

            if (data.success) {
                setAppointments(data.appointments.reverse());
                console.log(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        dtoken,
        setDtoken,
        appointments,
        setAppointments,
        getAppointments,
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctorContext = () => useContext(DoctorContext);

export default DoctorContextProvider;

import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);
    const [atoken, setAtoken] = useState(() => {
        try {
            const token = localStorage.getItem("atoken");
            return token ? token : "";
        } catch (error) {
            console.log(error);
            return "";
        }
    });
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/admin/all-doctors",
                {},
                { headers: { atoken } }
            );
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/admin/change-availability",
                { docId },
                { headers: { atoken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    
    const value = { atoken, setAtoken, backendUrl, doctors, getAllDoctors , changeAvailability};

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;

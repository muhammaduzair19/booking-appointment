import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [userData, setUserData] = useState(false);
    const [token, setToken] = useState(() => {
        try {
            const token = localStorage.getItem("userToken");
            console.log(token);

            return token ? token : "";
        } catch (error) {
            console.log(error);
            return "";
        }
    });
    const currencySymbol = "Rs.";

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/doctor/list");
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/user/get-profile", {
                headers: { token },
            });
            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            getUserData();
        } else {
            setUserData(false);
        }
    }, [token]);

    const value = {
        currencySymbol,
        doctors,
        token,
        setToken,
        backendUrl,
        getDoctorsData,
        userData,
        setUserData,
        getUserData,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;

import { createContext, useContext } from "react";

const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const value = {};

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctorContext = () => useContext(DoctorContext);

export default DoctorContextProvider;

import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PathManager, RequestStatus } from "../model/utils";
import axios from "axios";
import { LoginTO, RegisterTO } from "../model/TOs";
import { AuthService } from "../services";
export interface AppData {
    currentState: string;
    theme: string;
    locale: string;
}


class UserData {
    accessToken = localStorage.getItem("accessToken");
    refreshToken = localStorage.getItem("refreshToken");
};

export type AppContextType = {
    appData: AppData;
    user: UserData;
    setCurrentState: (value: string) => void;
    setTheme: (value: string) => void;
    setLocale: (value: string) => void;
    register: (registerTO: RegisterTO) => Promise<{status: RequestStatus}>;
    login: (loginTO: LoginTO) => Promise<{status: RequestStatus}>;
}

type AppContextProps = {
    children?: React.ReactNode;
}


const userData = new UserData();

if (userData.accessToken != null) {
    axios.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`;
}

const AppContext = React.createContext<AppContextType | null>(null);

const AppContextProvider: React.FC<AppContextProps> = ({children}) => {
    const location = useLocation();

    useEffect(() => {
        const currentPath = PathManager.getCurrentStateByPath();
        setCurrentState(currentPath);
    }, [location.pathname]);
    
    const [appData, setAppData] = useState<AppData>({
        currentState: PathManager.getCurrentStateByPath(),
        theme: 'light',
        locale: 'EN'
    });

    const [user, setUserData] = useState<UserData>(userData);

    const setCurrentState = (value: string) => {
        setAppData((prev) => ({...prev, currentState: value}));
    }

    const setTheme = (value: string) => {
        setAppData((prev)=> ({...prev, theme: value}));
    }

    const setLocale = (value: string) => {
        setAppData((prev)=> ({...prev, locale: value}));
    }

    const register = useCallback(async (registerTO: RegisterTO) => {
        const {status, data, err} = await AuthService.registerAccount(registerTO);
        if (status === RequestStatus.SUCCESS) {
            return { status };
        }
        //TODO: Error handling
        return { status };
    },[]);

    const login = useCallback(async (loginTO: LoginTO) => {
        const { status, data, err } = await AuthService.login(loginTO);
        if (status === RequestStatus.SUCCESS) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            setUserData(new UserData());
            return { status }
        }
        //TODO: Error handling
        return { status };
    }, []);

    return <AppContext.Provider value={{appData,user,setCurrentState, setTheme, setLocale, register, login}}>{children}</AppContext.Provider>
}

export { AppContext,AppContextProvider };
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { notify, PathManager, RequestStatus } from "../model/utils";
import axios from "axios";
import { Login, Register } from "../model/types.api";
import { AuthService } from "../services";

export interface AppData {
    currentState: string;
    theme: string;
}

// class UserData {
//     //todo: logged user guid is required to be accessed everywhere...
//     userGuid = localStorage.getItem("userGuid");
//     accessToken = localStorage.getItem("accessToken");
//     refreshToken = localStorage.getItem("refreshToken");
// };

export type UserData = {
    userGuid: string;
    accessToken: string;
    refreshToken: string;
}

export type AppContextType = {
    appData: AppData;
    user: UserData;
    setCurrentState: (value: string) => void;
    setTheme: (value: string) => void;
    setLocale: (value: string) => void;
    register: (registerTO: Register) => Promise<{status: RequestStatus}>;
    login: (loginTO: Login) => Promise<{status: RequestStatus}>;
    translate: (key: string) => string;
}

type AppContextProps = {
    children?: React.ReactNode;
}

 //const userData = new UserData();
// const userData: UserData = { accessToken: localStorage.getItem("accessToken"), refreshToken: localStorage.getItem("refreshToken"), userGuid: localStorage.getItem("userGuid")}

const AppContext = React.createContext<AppContextType | null>(null);

const AppContextProvider: React.FC<AppContextProps> = ({children}) => {
    const location = useLocation();
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const currentPath = PathManager.getCurrentStateByPath();
        setCurrentState(currentPath);
    }, [location.pathname]);
    
    const [appData, setAppData] = useState<AppData>({
        currentState: PathManager.getCurrentStateByPath(),
        theme: 'light'
    });

    //const [user, setUserData] = useState<UserData>();

    const setCurrentState = (value: string) => {
        setAppData((prev) => ({...prev, currentState: value}));
    }

    const setTheme = (value: string) => {
        setAppData((prev)=> ({...prev, theme: value}));
    }

    const setLocale = (value: string) => {
        i18n.changeLanguage(value);
    }

    const getUserFromLocalStorage = (): UserData => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const userGuid = localStorage.getItem("userGuid");

        if (!accessToken || !refreshToken || !userGuid) {
            
            throw new Error("Unauthorized");
        }

        return { accessToken, refreshToken, userGuid }
    }

    const register = useCallback(async (registerTO: Register) => {
        const {status, data, err} = await AuthService.registerAccount(registerTO);
        if (status === RequestStatus.SUCCESS) {
            notify('success', 'Registered successfully', 'Account created successfully, login to start using the application')
            return { status };
        }
        notify('error', 'Error', (err as any).message);
        return { status };
    },[]);

    const login = useCallback(async (loginTO: Login) => {
        const { status, data, err } = await AuthService.login(loginTO);
        if (status === RequestStatus.SUCCESS) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            // todo: check what backend response is like
            //localStorage.setItem('userGuid', data.userGuid);
            // temp for testing
            localStorage.setItem('userGuid', "63ef1ebe-2e40-4818-ad4c-69e5d2885da9");
            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            //setUserData(getUserFromLocalStorage());
            notify('success', 'Login successful', 'Successfully logged in');
            return { status }
        }
        notify('error', 'Error', (err as any).message);
        return { status };
    }, []);

    return <AppContext.Provider value={{appData, user: getUserFromLocalStorage(), setCurrentState, setTheme, setLocale, register, login}}>{children}</AppContext.Provider>
}

export { AppContext,AppContextProvider };
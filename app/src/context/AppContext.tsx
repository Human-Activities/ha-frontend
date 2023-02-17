import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiURL, notify, PathManager, RequestStatus } from "../model/utils";
import axios, { AxiosRequestConfig } from "axios";
import { ActivityCategory, BillItemCategory, Login, Register } from "../model/types.api";
import { AuthService } from "../services";
import { useTranslation } from "react-i18next";
import { getActivityCategories, getBillItemCategories } from "../services/categories";

export interface AppData {
    currentState: string;
    theme: string;
    activityCategories: ActivityCategory[];
    billItemCategories: BillItemCategory[];
}

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
    logout: () => void;
}

type AppContextProps = {
    children?: React.ReactNode;
}

const AppContext = React.createContext<AppContextType | null>(null);

const AppContextProvider: React.FC<AppContextProps> = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    useEffect(() => {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    }, []);

    useEffect(() => {
        const currentPath = PathManager.getCurrentStateByPath();
        setCurrentState(currentPath);
    }, [location.pathname]);
    
    const [appData, setAppData] = useState<AppData>({
        currentState: PathManager.getCurrentStateByPath(),
        theme: 'light',
        activityCategories: [],
        billItemCategories: [],
    });

    const setCurrentState = (value: string) => {
        setAppData((prev) => ({...prev, currentState: value}));
    }

    const setTheme = (value: string) => {
        setAppData((prev)=> ({...prev, theme: value}));
    }

    const setLocale = (value: string) => {
        i18n.changeLanguage(value);
    }

    const getAppData = useCallback((): AppData => {
        const appdata = localStorage.getItem("appData");
        if (appdata) {
            const newAppData: AppData = JSON.parse(appdata);
            return newAppData;
        }
        return {} as AppData;
    }, [])

    const getUserFromLocalStorage = useCallback((): UserData => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const userGuid = localStorage.getItem("userGuid");

        if (!accessToken || !refreshToken || !userGuid) {
            if(location.pathname != "/login") navigate("/login");
                return {} as UserData;
        }

        return { accessToken, refreshToken, userGuid }
    }, []);

    const setCommonData = async () => {
        try {
            const activityCategories = await getActivityCategories();
            const billItemCategories = await getBillItemCategories();

            setAppData((prevData) => ({...prevData, activityCategories, billItemCategories}));
            localStorage.setItem("appData", JSON.stringify({...appData, activityCategories, billItemCategories}));
        } catch(error) {
            notify('error', 'Error', (error as any).message);
        }
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

    const logout = useCallback(() => {
        navigate("/login");

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userGuid');
        localStorage.removeItem('appData');
        axios.defaults.headers.common.Authorization = undefined;
    }, [])

    const login = useCallback(async (loginTO: Login) => {
        const { status, data, err } = await AuthService.login(loginTO);
        if (status === RequestStatus.SUCCESS) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userGuid', data.userGuid);
            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            await setCommonData();
            notify('success', 'Login successful', 'Successfully logged in');
            return { status }
        }
        notify('error', 'Error', (err as any).message);
        return { status };
    }, []);

    const refreshToken = useCallback(async () => {
        const refreshTokenURL = `${ApiURL}authentication/refresh`;
        const { data } = await axios.post(refreshTokenURL, {refreshToken: localStorage.getItem("refreshToken")});
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        return data;
      }, []);

    useMemo(() => {   
        axios.interceptors.request.use((config): AxiosRequestConfig => {
          config.withCredentials = true;
          if(config.headers){
            config.headers = {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            };
          }
          return config;
        });
    
        axios.interceptors.response.use((response)=> response, async error => {
          const request = error.config;
          if(error?.response?.status === 400 && request?.url?.includes("/api/authentication/refresh")){
            logout(); 
            return;
          }
          if(error?.response?.status === 401) {
            const result = await refreshToken();
            if(result){
              request.headers.Authorization = `Bearer ${result.accessToken}`;
              return axios(request)
            }
          }
        });
      }, []);

    return <AppContext.Provider value={{appData: getAppData(), user: getUserFromLocalStorage(), setCurrentState, setTheme, setLocale, register, login, logout}}>
            {children}
        </AppContext.Provider>
}

export { AppContext, AppContextProvider };
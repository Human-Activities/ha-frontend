import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { notify, PathManager, RequestStatus } from "../model/utils";
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
}

type AppContextProps = {
    children?: React.ReactNode;
}

 //const userData = new UserData();
// const userData: UserData = { accessToken: localStorage.getItem("accessToken"), refreshToken: localStorage.getItem("refreshToken"), userGuid: localStorage.getItem("userGuid")}

const AppContext = React.createContext<AppContextType | null>(null);

const AppContextProvider: React.FC<AppContextProps> = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { i18n } = useTranslation();

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
            if(location.pathname != "/login") navigate("/login");
                return {} as UserData;
        }

        return { accessToken, refreshToken, userGuid }
    }

    const getCommonData = async () => {
        try {
            const activityCategories = await getActivityCategories();
            const billItemCategories = await getBillItemCategories();

            setAppData((prevData) => ({...prevData, activityCategories, billItemCategories}));
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
            await getCommonData();
            //setUserData(getUserFromLocalStorage());
            notify('success', 'Login successful', 'Successfully logged in');
            return { status }
        }
        notify('error', 'Error', (err as any).message);
        return { status };
    }, []);

    const refreshToken = useCallback(async () => {
        const refreshTonekURL = "todo"
        const { data } = await axios.post(refreshTonekURL);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        return false;
      }, []);

    useMemo(() => {
        //axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
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
          if(error.response.status === 400 && request?.url?.includes("TODO")){
            // todo logout 
            return;
          }
          if(error.response.status === 401) {
            const result = await refreshToken();
            if(result){
              request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
              return axios(request)
            }
          }
        });
      }, []);

    return <AppContext.Provider value={{appData, user: getUserFromLocalStorage(), setCurrentState, setTheme, setLocale, register, login}}>
            {children}
        </AppContext.Provider>
}

export { AppContext, AppContextProvider };
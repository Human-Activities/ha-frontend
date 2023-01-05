import React, { useState } from "react";
import { PathManager, StateConstants } from "../model/utils";
export interface AppData {
    currentState: string;
    theme: string;
    locale: string;
}

export type AppContextType = {
    appData: AppData;
    setCurrentState: (value: string) => void;
    setTheme: (value: string) => void;
    setLocale: (value: string) => void;
}

type AppContextProps = {
    children?: React.ReactNode;
}

const AppContext = React.createContext<AppContextType | null>(null);

const AppContextProvider: React.FC<AppContextProps> = ({children}) => {
    const [appData, setAppData] = useState<AppData>({
        currentState: PathManager.getCurrentStateByPath(),
        theme: 'light',
        locale: 'EN'
    });

    const setCurrentState = (value: string) => {
        setAppData((prev) => ({...prev, currentState: value}));
    }

    const setTheme = (value: string) => {
        setAppData((prev)=> ({...prev, theme: value}));
    }

    const setLocale = (value: string) => {
        setAppData((prev)=> ({...prev, locale: value}));
    }
    return <AppContext.Provider value={{appData, setCurrentState, setTheme, setLocale}}>{children}</AppContext.Provider>
}

export { AppContext,AppContextProvider };
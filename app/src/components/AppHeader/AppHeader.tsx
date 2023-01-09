import React from "react";
import { Header } from "antd/es/layout/layout";
import { HaButton } from "..";
import './AppHeader.scss'
import { AppContext, AppContextType } from "../../context";
import { useNavigate } from "react-router-dom";

const AppHeader: React.FC = () => {
    const {appData, setCurrentState} = React.useContext(AppContext) as AppContextType;
    const navigate = useNavigate();

    const extendedMenu = () => {
        switch(appData.currentState) {
            case 'home':
                const onLoginButton = () => {
                    navigate("/login");
                }
                return [<HaButton key="loginBtn" size="large" type="primary" onClick={onLoginButton}>Start now</HaButton>];
            case 'panel':
                return [];
            case 'login':    
            default:    
                return [];
        }
    }

    return (
        <Header className="ha-h-flexbox app-header">
            <div className="logo">Human Activities - plan your life</div>
            <div style={{gap: '.5em'}} className="ha-h-flexbox">
                {extendedMenu()}
                <HaButton style={{color: 'white'}} type="text">Dark mode</HaButton>
            </div>
        </Header>
    )
}

export default AppHeader;
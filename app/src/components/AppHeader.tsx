import React from "react";
import { Menu } from 'antd';
import { Header } from "antd/es/layout/layout";
import { HaButton } from ".";
const AppHeader: React.FC = () => {
    /* TODO: Pobieranie typu menu z kontekstu */
    return (
        <Header style={{width: '100%', display: 'flex', background: '#1A120B', color: "white", justifyContent: 'space-between'}}>
            <div className="logo">Human Activities - plan your life</div>
            <Menu mode="horizontal" style={{background: '#1A120B', color: "white"}}>
                <Menu.Item>
                    <HaButton size="large" type="primary" onClick={() => history.pushState({}, '', 'login')}>Start now</HaButton>
                </Menu.Item>
                <Menu.Item>
                    <HaButton type="text">Dark mode</HaButton>
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default AppHeader;
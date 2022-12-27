import React from "react";
import { Button, Layout, Menu } from 'antd';
import { Header } from "antd/es/layout/layout";
const AppHeader: React.FC = () => {
    /* TODO: Pobieranie typu menu z kontekstu */
    return (
        <Header style={{width: '100%', display: 'flex', background: '#1A120B', color: "white", justifyContent: 'space-between'}}>
            <div className="logo">Human Activities - plan your life</div>
            <Menu mode="horizontal" style={{background: '#1A120B', color: "white"}}>
                <Menu.Item>
                    <Button size="large" type="primary" style={{background: 'orange'}} onClick={() => history.pushState({}, '', 'login')}>Start now</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button type="text">Dark mode</Button>
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default AppHeader;
import React, { ReactNode } from "react";
import { Avatar, Layout, Menu } from "antd";
import './PanelPage.scss';
import { AppContext, AppContextType } from "../../context";

type PanelProps = {
    children?: ReactNode 
}

export const PanelPage = ({ children }: PanelProps) => {
    const {Sider, Content} = Layout;
    const {user} = React.useContext(AppContext) as AppContextType;
    console.log(user);
    return (
        <Layout style={{margin: 'auto', width: '100%'}}>
            <Sider id="sider">
                <Menu style={{backgroundColor: '#333333'}}className='sider-menu ha-v-flexbox'>
                    <Menu.Item className="sider-menu-item">
                        <Avatar size={40} shape={'circle'}>+</Avatar>
                    </Menu.Item>
                    <Menu.Item className="sider-menu-item">
                        <Avatar size={40} shape={'circle'}>+</Avatar>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content style={{width: '100%'}}>
                {children || "Test (not implemented)"}
            </Content>
        </Layout>
    )
}
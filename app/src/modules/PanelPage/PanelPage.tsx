import React, { ReactNode, CSSProperties } from "react";
import { Avatar, Layout, Menu } from "antd";
import './PanelPage.scss';
import { AppContext, AppContextType } from "../../context";

type PanelProps = {
    children?: ReactNode 
}

const menuStyle = {
    backgroundColor: 'var(--sider-menu-color)',
    gap: '.25em',
    
} as CSSProperties;
const { Sider, Content, Footer } = Layout;

export const PanelPage = ({ children }: PanelProps) => {
    const {user} = React.useContext(AppContext) as AppContextType;
    console.log(user);
    return (
        <Layout style={{width: '100%',height: '50em'}}>
            <Sider id="sider">
                <Menu style={menuStyle} className='sider-menu ha-v-flexbox'>
                    <Menu.Item className="sider-menu-item">
                        <Avatar size={40} shape={'circle'}>+</Avatar>
                    </Menu.Item>
                    <Menu.Item className="sider-menu-item">
                        <Avatar size={40} shape={'circle'}>+</Avatar>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content className="panel-content">
                {children || "Test (not implemented)"}
            </Content>
        </Layout>
    )
}
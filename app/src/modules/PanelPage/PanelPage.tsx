import React, { CSSProperties } from "react";
import { Avatar, Layout, Menu } from "antd";
import './PanelPage.scss';
import { AppContext, AppContextType } from "../../context";

const {Sider, Content} = Layout;

const menuStyle = {
    backgroundColor: 'var(--sider-menu-color)',
    gap: '.25em',
    
} as CSSProperties;

const PanelPage: React.FC = () => {
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

            </Content>
        </Layout>
    )
}

export default PanelPage;
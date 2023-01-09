import React from "react";
import { Avatar, Layout, Menu } from "antd";
import './PanelPage.scss';
import { AppContext, AppContextType } from "../../context";

const {Sider, Content} = Layout;

const PanelPage: React.FC = () => {
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
                Test
            </Content>
        </Layout>
    )
}

export default PanelPage;
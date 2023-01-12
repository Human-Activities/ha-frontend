import React, { CSSProperties, useEffect, useState } from "react";
import { Layout } from "antd";
import './PanelPage.scss';
import { AppContext, AppContextType } from "../../context";
import { HaMenu } from "../../components";
import { MenuItem, SubMenuLink } from "../../model/utils";
import { useNavigate } from "react-router-dom";

const {Sider, Content} = Layout;


const PanelPage: React.FC = () => {
    const {user} = React.useContext(AppContext) as AppContextType;
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    
    const onExpand = (value: boolean) => setExpanded(value);

    const generateSubMenuForGroup = (groupId: string | number): SubMenuLink[] => {
        return [
            {
                key: `activities${groupId}`, name: "Activities", path: '/groups/activities'
            },
            {
                key: `settlements${groupId}`, name: "Settlements", path: '/groups/settlements'
            },
            {
                key: `events${groupId}`, name: "Events", path: '/groups/events'
            }
        ] 
    }

    const menuProvider: MenuItem[] = [
        {
            key: 0, name: 'Your Panel', click: () => navigate('/panel')
        },
        {
            key: 1, name: "Grupa Test", submenuList: generateSubMenuForGroup(1)
        }, 
        {
            key: 2, name: "Grupa Test Dwa", submenuList: generateSubMenuForGroup(2)
        },
        {
            key: 3, name: "Grupa Test Trzy Trzy", submenuList: generateSubMenuForGroup(3)
        },
        {
            key: 4, name: '+', tooltipText: 'Create a new group'
        }
    ]
    return (
        <Layout style={{width: '100%',height: '50em'}}>
            <Sider id="sider" className={`ha-v-flexbox ${expanded ? 'expanded' : ''}`}>
                <HaMenu provider={menuProvider} defaultSelected={menuProvider[0]} onExpand={onExpand}/>
            </Sider>
            <Content className="panel-content">
            </Content>
        </Layout>
    )
}

export default PanelPage;
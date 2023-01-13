import React, { ReactNode, CSSProperties, useEffect, useState } from "react";
import { Avatar, Layout, Menu } from "antd";
import './PanelPage.scss';
import { AppContext, AppContextType } from "../../context";
import { HaMenu, HaModal } from "../../components";
import { MenuItem, SubMenuLink, useModal } from "../../model/utils";
import { useNavigate } from "react-router-dom";

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
    const [addGroupModalOpen, showAddGroupModal, closeAddgroupModal, addgroupModalProps] = useModal('Create new group');
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    
    const onExpand = (value: boolean) => setExpanded(value);
    const testOverride = () => console.log('testOverride');

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
            key: 4, name: '+', tooltipText: 'Create a new group', click: () => showAddGroupModal()
        }
    ]
    return (
        <Layout style={{width: '100%',height: '50em'}}>
            <Sider id="sider" className={`ha-v-flexbox ${expanded ? 'expanded' : ''}`}>
                <HaMenu provider={menuProvider} onExpand={onExpand}/>
            </Sider>
            <Content className="panel-content">
                {children || "Test (not implemented)"}
            </Content>
            <HaModal {...addgroupModalProps} open={addGroupModalOpen}>
                Test
            </HaModal>
        </Layout>
    )
}
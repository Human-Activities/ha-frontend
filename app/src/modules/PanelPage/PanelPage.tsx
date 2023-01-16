import React, { ReactNode, CSSProperties, useEffect, useState } from "react";
import { Layout } from "antd";
import './PanelPage.scss';
import { AppContext, AppContextType } from "../../context";
import { HaMenu, HaModal } from "../../components";
import { MenuItem, MenuUtils, ModalFormParams, notify, RequestStatus, SubMenuLink, useModal } from "../../model/utils";
import { useNavigate } from "react-router-dom";
import { CreateGroupForm } from "../GroupPage";
import { useForm } from "antd/es/form/Form";
import { Group } from "../../model/types.api";
import { GroupService } from "../../services";

type PanelProps = {
    children?: ReactNode 
}

const { Sider, Content, Footer } = Layout;

export const PanelPage = ({ children }: PanelProps) => {
    const [expanded, setExpanded] = useState(false);
    const menuItems = MenuUtils.generateMenuProviderForPanel([], () => showAddGroupModal());
    const [menuProvider, setMenuProvider] = useState<MenuItem[]>(menuItems);
    const [groupFormInstance] = useForm();
    const {user} = React.useContext(AppContext) as AppContextType;

    const onCreateGroup = async(value: Group) => {
        const {status,data} = await GroupService.create(value);
        if (status === RequestStatus.SUCCESS) {
            const {message} = data;
            closeAddGroupModal();
            getGroups();
            notify('success', 'Creation successful', message);
        }
    }

    const {
        isOpen: addGroupModalOpen, 
        open: showAddGroupModal, 
        close: closeAddGroupModal, 
        props: addgroupModalProps} = useModal('Create new group', 'small', {instance: groupFormInstance, onFetch: onCreateGroup} as ModalFormParams<Group>);
    
    const onExpand = (value: boolean) => setExpanded(value);
    
    const getGroups = async() => {
        const {status, data, error} = await GroupService.getGroups();
        if (status === RequestStatus.SUCCESS) {
            setMenuProvider(MenuUtils.generateMenuProviderForPanel(data as Group[], () => showAddGroupModal()));
        }
    }

    useEffect(() => {
        getGroups();
    }, []);

    return (
        <Layout style={{width: '100%',height: '50em'}}>
            <Sider id="sider" className={`ha-v-flexbox ${expanded ? 'expanded' : ''}`}>
                <HaMenu provider={menuProvider} onExpand={onExpand}/>
            </Sider>
            <Content className="panel-content ha-scroll">
                {children || "Test (not implemented)"}
            </Content>
            <HaModal title={""} {...addgroupModalProps} open={addGroupModalOpen}>
                <CreateGroupForm form={groupFormInstance}/>
            </HaModal>
        </Layout>
    )
}
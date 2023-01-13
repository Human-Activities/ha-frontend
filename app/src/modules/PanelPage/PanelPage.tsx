import React, { CSSProperties, useEffect, useState } from "react";
import { Layout } from "antd";
import './PanelPage.scss';
import { AppContext, AppContextType } from "../../context";
import { HaMenu, HaModal } from "../../components";
import { MenuItem, MenuUtils, ModalFormParams, notify, RequestStatus, SubMenuLink, useModal } from "../../model/utils";
import { useNavigate } from "react-router-dom";
import { CreateGroupForm } from "../GroupPage";
import { useForm } from "antd/es/form/Form";
import { GroupTO } from "../../model/TOs";
import { GroupService } from "../../services";

const {Sider, Content} = Layout;


const PanelPage: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const [menuProvider, setMenuProvider] = useState<MenuItem[]>(MenuUtils.generateMenuProviderForPanel([], () => showAddGroupModal()));
    const [refresh, setRefresh] = useState(false);
    const [groupFormInstance] = useForm();
    const {user} = React.useContext(AppContext) as AppContextType;
    const onCreateGroup = async(value: GroupTO) => {
        const {status,data} = await GroupService.create(value);
        if (status === RequestStatus.SUCCESS) {
            const {message} = data;
            closeAddGroupModal();
            setRefresh(!refresh);
            notify('success', 'Creation successful', message);
        }
    }
    const [
        addGroupModalOpen, 
        showAddGroupModal, 
        closeAddGroupModal, 
        addgroupModalProps] = useModal('Create new group', 'small', {instance: groupFormInstance, onFetch: onCreateGroup} as ModalFormParams<GroupTO>);
    
    const onExpand = (value: boolean) => setExpanded(value);
    
    const getGroups = async() => {
        const {status, data, error} = await GroupService.getGroups();
        if (status === RequestStatus.SUCCESS) {
            setMenuProvider(MenuUtils.generateMenuProviderForPanel(data as GroupTO[], () => showAddGroupModal()));
        }
    }

    useEffect(() => {
        getGroups();
    }, [refresh]);

    return (
        <Layout style={{width: '100%',height: '50em'}}>
            <Sider id="sider" className={`ha-v-flexbox ${expanded ? 'expanded' : ''}`}>
                <HaMenu provider={menuProvider} onExpand={onExpand}/>
            </Sider>
            <Content className="panel-content">
            </Content>
            <HaModal {...addgroupModalProps} open={addGroupModalOpen}>
                <CreateGroupForm form={groupFormInstance}/>
            </HaModal>
        </Layout>
    )
}

export default PanelPage;
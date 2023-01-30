import React, { useCallback, useEffect, useState } from "react";
import { Tabs } from "antd";
import { PanelPage } from "../PanelPage";
import { ActivitiesTab } from "./ActivitiesTab";
import { HaButton, HaPageHeader } from "../../components";
import { getActivities, getGroupActivities } from "../../services";
import { CreateActivityModal, useCreateActivityModal } from "./CreateActivity";
import { Activity } from "../../model/types.api";

import "./ActivitiesPage.scss";
import { TabItem } from "../../model/types.app";
import { useParams } from "react-router-dom";

type ActivitiesType = "friends" | "user" | "group";

export const ActivitiesPage = () => {
    const { groupGuid } = useParams();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedTab, setSelectedTab] = useState<ActivitiesType>("friends");
    const [selectedGroupGuid, setSelectedGroupGuid] = useState<string>("");
    const { modal, form } = useCreateActivityModal();

    const defaultTabs: TabItem<ActivitiesType>[] = [
        {
            label: "Friends & Mine",
            key: "friends",
            children: <ActivitiesTab activities={selectedTab === "friends" ? activities : []}/>
        },
        {
            label: "Mine",
            key: "user",
            children: <ActivitiesTab activities={selectedTab === "user" ? activities : []}/>
        }
    ];

    const groupTab: TabItem<ActivitiesType> = { 
        label: "Group", 
        key: "group", 
        children: <ActivitiesTab activities={selectedTab === "group" ? activities : []} /> 
    };

    const fetchActivities = useCallback((key: ActivitiesType) => {
        switch(key) {
            case "friends": 
                getActivities().then(response => {
                    setSelectedTab("friends");
                    setActivities(response)
                });
            break;
            case "user":
                getActivities(true).then(response => {
                    setSelectedTab("user");
                    setActivities(response)
                });
            break;
            case "group":
                getGroupActivities(selectedGroupGuid).then(response => {
                    setSelectedTab("group");
                    setActivities(response)
                });
            break;
        }
    }, []);

    useEffect(() => {
        if (groupGuid) {
            setSelectedTab("group");
            setSelectedGroupGuid(groupGuid);
        }

        fetchActivities(selectedTab);
    }, [fetchActivities]);

    return (
        <PanelPage>
            <HaPageHeader title='Activities Page' toolbar={[<HaButton onClick={() => modal.open()}>Add activity</HaButton>]}/>
            <Tabs 
                type="card"
                tabBarStyle={{background: "#f5f5f5", margin: 0}}
                items={groupGuid ? [groupTab] : defaultTabs} 
                onTabClick={(key) => fetchActivities(key as ActivitiesType)} /> 
            <CreateActivityModal key="createModal" formModal={{ modal, form}}/>
        </PanelPage>
    )
}

export default PanelPage;
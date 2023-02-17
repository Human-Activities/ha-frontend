import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { AppContext, AppContextType } from "../../context";

type ActivitiesType = "friends" | "user" | "group";

export const ActivitiesPage = () => {
    const { t } = useTranslation("activities");
    const { groupGuid } = useParams();
    const { user: { userGuid }} = useContext(AppContext) as AppContextType;
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedTab, setSelectedTab] = useState<ActivitiesType>(groupGuid ? "group" : "user");
    const [selectedGroupGuid, setSelectedGroupGuid] = useState<string>();
    const { modal, form } = useCreateActivityModal();

    const defaultTabs: TabItem<ActivitiesType>[] = [
        // {
        //     label: "Friends & Mine",
        //     key: "friends",
        //     children: <ActivitiesTab activities={selectedTab === "friends" ? activities : []}/>
        // },
        {
            label: "Mine",
            key: "user",
            children: <ActivitiesTab activities={activities}/>
        }
    ];

    const groupTab: TabItem<ActivitiesType> = { 
        label: "Group", 
        key: "group", 
        children: <ActivitiesTab activities={activities} /> 
    };

    const fetchActivities = useCallback((key: ActivitiesType) => {
        switch(key) {
            // case "friends": 
            //     getActivities(userGuid, selectedGroupGuid).then(response => {
            //         setSelectedTab("friends");
            //         setActivities(response)
            //     });
            // break;
            case "user":
                getActivities(userGuid).then(response => {
                    setSelectedTab("user");
                    setActivities(response)
                });
            break;
            case "group":
                getGroupActivities(userGuid, selectedGroupGuid).then(response => {
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
            <HaPageHeader title={t("grid.header")} toolbar={[<HaButton onClick={() => modal.open()}>Add activity</HaButton>]}/>
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
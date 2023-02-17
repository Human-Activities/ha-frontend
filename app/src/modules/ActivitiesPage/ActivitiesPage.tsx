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
import { CreateActivityTab, UpdateActivityTab } from "./MutableActivityTabs";

type ActivitiesType = "friends" | "user" | "group" | "create" | "details" | string;
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultTabs: TabItem<ActivitiesType>[] = [
    // {
    //     label: "Friends & Mine",
    //     key: "friends",
    //     children: <ActivitiesTab activities={selectedTab === "friends" ? activities : []}/>
    // },
    {
        label: "Mine",
        key: "user",
        //children: <ActivitiesTab activities={activities}/>
    }
];

export const ActivitiesPage = () => {
    const { t } = useTranslation("activities");
    const { groupGuid } = useParams();
    const { user: { userGuid }} = useContext(AppContext) as AppContextType;
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedTab, setSelectedTab] = useState<ActivitiesType>(groupGuid ? "group" : "user");
    const [selectedGroupGuid, setSelectedGroupGuid] = useState<string>();
    const [previousTab, setPreviousTab] = useState<ActivitiesType>(groupGuid ? "group" : "user");
    const [tabsStore, setTabsStore] = useState<TabItem<ActivitiesType>[]>(defaultTabs);

    const groupTab: TabItem<ActivitiesType> = { 
        label: "Group activities", 
        key: "group", 
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
                if(selectedGroupGuid) {
                    getGroupActivities(userGuid, selectedGroupGuid).then(response => {
                        setSelectedTab("group");
                        setActivities(response)
                    });
                }
            break;
        }
    }, []);

    const createActivityTab: TabItem<ActivitiesType> = {
        label: "Create activity",
        key: "create",
        children: <CreateActivityTab groupGuid={groupGuid} closeTab={() => removeTab("create")} />,
    }

    const getActivityDetailsTab = (activity: Activity): TabItem<ActivitiesType> => {
        return {
            label: activity.name,
            key: activity.activityGuid,
            children: <UpdateActivityTab refreshGrid={() => fetchActivities(previousTab)} closeTab={() => removeTab(activity.activityGuid)} activityReference={activity} />,
        }
    }

    const openCreateActivityTab = useCallback(() => {
        if (!tabsStore.find(tab => tab.key === "create")) {
            setTabsStore([...tabsStore, createActivityTab]);
            setPreviousTab(selectedTab);
            setSelectedTab("create");
        }
    }, [tabsStore, setTabsStore, createActivityTab, setSelectedTab]);

    const openActivityDetailsTab = useCallback((activity: Activity) => {
        if (!tabsStore.find(tab => tab.key === activity.activityGuid)) {
            setTabsStore([...tabsStore, getActivityDetailsTab(activity)]);
            setPreviousTab(selectedTab);
            setSelectedTab(activity.activityGuid);
        }
    }, [tabsStore, setTabsStore, getActivityDetailsTab, setSelectedTab]);

    const handleTabChange = (key: ActivitiesType) => {
        setSelectedTab(key);
        if (key === "user" || key === "group") {
            fetchActivities(key);
        }
    }

    const removeTab = (targetKey: TargetKey) => {
        let newActiveKey = previousTab;
        const newTabs = tabsStore.filter((item) => item.key !== targetKey);
        setTabsStore(newTabs);
        setSelectedTab(newActiveKey);
    };
    
    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: "add" | "remove",
    ) => {
        if (action === "remove") {
            removeTab(targetKey);
        }
    };

    useEffect(() => {
        if (groupGuid) {
            setSelectedTab("group");
            setSelectedGroupGuid(groupGuid);
        }

        fetchActivities(selectedTab);
    }, [fetchActivities]);

    useEffect(() => {
        if (groupGuid) {
            setTabsStore([{
                label: "Group activities",
                key: "group",
                closable: false,
            }]);
        } else {
            setTabsStore([{
                label: "My activities",
                key: "user",
                closable: false,
            }]);
        }
    }, []);

    useEffect(() => {
        if(selectedTab === "user" || selectedTab === "group") {
            fetchActivities(selectedTab);
        }
    }, [selectedTab]);

    useEffect(() => {
        setTabsStore((prevTabsStore) =>
            prevTabsStore.map((tab) => {
            if (tab.key === "user" || tab.key === "group") {
                return {
                ...tab,
                label: tab.key === "user" ? "My activities" : "Group activities",
                children: <ActivitiesTab 
                    activities={activities} 
                    openActivityDetailsTab={openActivityDetailsTab} 
                    refreshGrid={() => fetchActivities(selectedTab)}/>,
                };
            } else {
                return tab;
            }
            })
        );
    }, [activities]);


    return (
        <PanelPage>
            <HaPageHeader title={t("grid.header")} toolbar={[<HaButton onClick={() => openCreateActivityTab()}>Add activity</HaButton>]}/>
            <Tabs 
                activeKey={selectedTab}
                hideAdd
                type="editable-card"
                tabBarStyle={{background: "#f5f5f5", margin: 0}}
                items={tabsStore}
                onChange={(key) => handleTabChange(key as ActivitiesType)}
                onEdit={onEdit} /> 
        </PanelPage>
    )
}
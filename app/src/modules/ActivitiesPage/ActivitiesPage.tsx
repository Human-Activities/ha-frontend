import React, { useEffect, useState } from "react";
import { Tabs, Layout } from "antd";
import { AppContext, AppContextType } from "../../context";
import { PanelPage } from "../PanelPage";
import { ActivitiesTab } from "./ActivitiesTab";
import { HaButton, HaPageHeader } from "../../components";
import { getActivities } from "../../services";
import { CreateActivityModal, useCreateActivityModal } from "./CreateActivity";
import { Activity } from "../../model/types.api";

import "./ActivitiesPage.scss";

type ActivitiesType = "friends" | "user";
const { Header } = Layout;

export const ActivitiesPage = () => {
    const {user} = React.useContext(AppContext) as AppContextType;
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedTab, setSelectedTab] = useState<ActivitiesType>("friends");
    const { modal, form } = useCreateActivityModal();

    const fetchActivities = (key: ActivitiesType) => {
        if (key === "friends") {
            getActivities().then(response => {
                setSelectedTab("friends");
                setActivities(response)
            });
        } else {
            getActivities(true).then(response => {
                setSelectedTab("user");
                setActivities(response)
            });
        }
    }

    const defaultTabs = [
        {
            label: "Aktywności twojego grona",
            key: "friends",
            children: <ActivitiesTab activities={selectedTab === "friends" ? activities : []}/>
        },
        {
            label: "Twoje aktywności",
            key: "yours",
            children: <ActivitiesTab activities={selectedTab === "user" ? activities : []}/>
        }
    ]

    useEffect(() => {
        fetchActivities(selectedTab);
    }, []);

    return (
        <PanelPage>
            <HaPageHeader title='Activities Page' toolbar={[<HaButton onClick={() => modal.open()}>Add activity</HaButton>]}/>
            <Tabs 
                type="card"
                tabBarStyle={{background: "#f5f5f5", margin: 0}}
                items={defaultTabs} 
                onTabClick={(key) => fetchActivities(key as ActivitiesType)} /> 
            <CreateActivityModal key="createModal" formModal={{ modal, form}}/>
        </PanelPage>
    )
}

export default PanelPage;
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { AppContext, AppContextType } from "../../context";
import { PanelPage } from "../PanelPage";
import { ActivitiesTab, Activity } from "./ActivitiesTab";
import "./ActivitiesPage.scss";

type ActivitiesType = "friends" | "yours";

export const ActivitiesPage = () => {
    const {user} = React.useContext(AppContext) as AppContextType;
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedTab, setSelectedTab] = useState<ActivitiesType>("friends");

    const fetchActivities = (key: ActivitiesType) => {
        if (key === "friends") {
            // fetch friends activities
            setSelectedTab("friends");
            setActivities([
                {title: "Test 1", category: "Sport", description: "Nowy sport odkryty"},
                {title: "Test tytuł 2", category: "Jedzenie", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
                {title: "Test 3", category: "Rozrywka", description: "Dance"},
                {title: "Tytuł 4", category: "Lista zadań", description: "Pora na wyzwanie"},
            ])
        } else {
            // fetch user activities
            setSelectedTab("yours");
            setActivities([
                {title: "Test 5", category: "Sport", description: "Nowy sport odkryty"},
                {title: "Tytuł testowy 6", category: "Rachunek", description: "Nowy rachunek"},
                {title: "Długi tytuł dla testu karty 7", category: "Rozrywka", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
            ])
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
            children: <ActivitiesTab activities={selectedTab === "yours" ? activities : []}/>
        }
    ]

    useEffect(() => {
        fetchActivities(selectedTab);
    }, []);

    return (
        <PanelPage>
            <h3 className="header">Activities Page</h3>
            <p>{"(Implementing)"}</p>
            <Tabs 
                type="card"
                tabBarStyle={{background: "#f5f5f5", margin: 0}}
                items={defaultTabs} 
                onTabClick={(key) => fetchActivities(key as ActivitiesType)} /> 
        </PanelPage>
    )
}

export default PanelPage;
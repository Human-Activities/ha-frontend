import React, { useCallback, useContext, useEffect, useState } from "react";
import { Tabs } from "antd";
import { PanelPage } from "../PanelPage";
import { FinancesTab } from "./FinancesTab";
import { HaButton, HaPageHeader } from "../../components";
import { Bill } from "../../model/types.api";
import { AppContext, AppContextType } from "../../context";

import "./FinancesPage.scss";
import { getUserBills, getGroupBills } from "../../services/finances";
import { useTranslation } from "react-i18next";
import { TabItem } from "../../model/types.app";
import { CreateBillTab, UpdateBillTab } from "./MutableBillTabs";
import { useParams } from "react-router-dom";

type FinancesTabType = "user" | "group" | "create" | "details" | string;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultTabs: TabItem<FinancesTabType>[] = [
    {
        label: "My finances",
        key: "user",
        closable: false,
    },
];

export const FinancesPage = () => {
    const { t } = useTranslation("finances");
    const { groupGuid } = useParams();
    const [bills, setBills] = useState<Bill[]>([]);
    const [selectedTab, setSelectedTab] = useState<FinancesTabType>(groupGuid ? "group" : "user");
    const [previousTab, setPreviousTab] = useState<FinancesTabType>(groupGuid ? "group" : "user");
    // const [selectedGroupGuid, setSelectedGroupGuid] = useState<string>("");
    const { user: { userGuid } } = useContext(AppContext) as AppContextType;
    const [tabsStore, setTabsStore] = useState<TabItem<FinancesTabType>[]>(defaultTabs);

    const createBillTab: TabItem<FinancesTabType> = {
        label: "Create bill",
        key: "create",
        children: <CreateBillTab groupGuid={groupGuid} closeTab={() => removeTab("create")} />,
    }

    const getBillDetailsTab = (bill: Bill): TabItem<FinancesTabType> => {
        return {
            label: bill.name,
            key: bill.guid,
            children: <UpdateBillTab closeTab={() => removeTab(bill.guid)} billReference={bill} />,
        }
    }

    const fetchBills = useCallback(async (key: FinancesTabType) => {
        if(key === "user") {
            const bills = await getUserBills();
            setBills(bills);
        } else {
            if (groupGuid) {
                const bills = await getGroupBills(groupGuid);
                setBills(bills);
            }
        }
    }, []);

    const openCreateBillTab = useCallback(() => {
        if (!tabsStore.find(tab => tab.key === "create")) {
            setTabsStore([...tabsStore, createBillTab]);
            setPreviousTab(selectedTab);
            setSelectedTab("create");
        }
    }, [tabsStore, setTabsStore, createBillTab, setSelectedTab]);

    const openBillDetailsTab = useCallback((bill: Bill) => {
        if (!tabsStore.find(tab => tab.key === bill.guid)) {
            setTabsStore([...tabsStore, getBillDetailsTab(bill)]);
            setPreviousTab(selectedTab);
            setSelectedTab(bill.guid);
        }
    }, [tabsStore, setTabsStore, getBillDetailsTab, setSelectedTab]);

    const handleTabChange = (key: FinancesTabType) => {
        setSelectedTab(key);
        if (key === "user" || key === "group") {
            fetchBills(key);
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
            setTabsStore([{
                label: "Group finances",
                key: "group",
                closable: false,
            }]);
        } else {
            setTabsStore([{
                label: "My finances",
                key: "user",
                closable: false,
            }]);
        }
    }, []);

    useEffect(() => {
        if(selectedTab === "user" || selectedTab === "group") {
            fetchBills(selectedTab);
        }
    }, [selectedTab]);

    useEffect(() => {
        setTabsStore((prevTabsStore) =>
            prevTabsStore.map((tab) => {
            if (tab.key === "user" || tab.key === "group") {
                return {
                ...tab,
                children: <FinancesTab bills={bills} openBillDetails={openBillDetailsTab} />,
                };
            } else {
                return tab;
            }
            })
        );
    }, [bills]);

    return (
        <PanelPage>
            <HaPageHeader 
                title={t("grid.header")} 
                toolbar={[<HaButton onClick={() => openCreateBillTab()}>Add new bill</HaButton>]}/>
            <Tabs
                defaultActiveKey={"user"}
                activeKey={selectedTab}
                hideAdd
                type="editable-card"
                tabBarStyle={{background: "#f5f5f5", margin: 0}}
                items={tabsStore}
                onChange={(key) => handleTabChange(key as FinancesTabType)}
                onEdit={onEdit}
            /> 
        </PanelPage>
    )
}
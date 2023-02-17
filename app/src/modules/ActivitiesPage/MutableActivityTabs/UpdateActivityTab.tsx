import { useContext, useState } from "react";
import { AppContext, AppContextType } from "../../../context";
import { UpdateActivityValues, UpdateBillValues } from "../../../model/types.app";

import "./CreateUpdateBill.scss";
import { Activity } from "../../../model/types.api";
import { CreateActivityForm } from "../CreateActivity/CreateActivityForm";
import { useForm } from "antd/es/form/Form";
import { UpdateActivityFormConsumer } from "./ActivityFormConsumer";

type Props = {
    activityReference: Activity;
    closeTab: () => void;
    refreshGrid: () => void;
};

export const UpdateActivityTab = ({ activityReference, closeTab, refreshGrid }: Props) => {
    const [activity, setActivity] = useState<UpdateActivityValues>({ 
        userGuid: activityReference.userGuid,
        activityGuid: activityReference.activityGuid, 
        description: activityReference.description,
        name: activityReference.name,
        isPublic: activityReference.isPublic,
        categoryId: activityReference.category?.id
    });

    const updateAndRefresh = (newActivity: Activity) => {
        setActivity({ 
            userGuid: newActivity.userGuid,
            activityGuid: newActivity.activityGuid, 
            description: newActivity.description,
            name: newActivity.name,
            isPublic: newActivity.isPublic,
            categoryId: newActivity.category?.id
        })
        refreshGrid();
    }

    const [editActivityForm] = useForm<UpdateActivityValues>();

    return (
        <>
            <CreateActivityForm form={editActivityForm} activity={activity} />
            <UpdateActivityFormConsumer onClose={closeTab} form={editActivityForm} refreshGrid={(newActivity: Activity) => updateAndRefresh(newActivity)}/>
        </>
    )
}
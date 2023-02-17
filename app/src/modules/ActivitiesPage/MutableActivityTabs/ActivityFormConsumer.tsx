
import { FormInstance } from "antd";
import { useCallback } from "react";
import { HaButton } from "../../../components";
import { Activity } from "../../../model/types.api";
import { ActivityFormValues, CreateActivityValues, UpdateActivityValues } from "../../../model/types.app";
import { notify } from "../../../model/utils";
import { createActivity, updateActivity } from "../../../services";
import "./CreateUpdateBill.scss";

type Props = {
    submitLabel: string;
    onSubmit: () => void;
    onCancel: () => void;
}

export type ActivityFormConsumerProps<T extends ActivityFormValues> = {
    onClose: () => void;
    refreshGrid?: (newActivity: Activity) => void;
    form: FormInstance<T>;
    activityGuid?: string;
}

export const ActivityFormConsumer = ({ onSubmit, onCancel, submitLabel }: Props) => {
    return (
        <div className="bill-consumer-actions">
            <HaButton onClick={() => onCancel()}>Cancel</HaButton>
            <HaButton onClick={() => onSubmit()} variant="positive">{submitLabel}</HaButton>
        </div>
    )
}

export const CreateActivityFormConsumer = ({form, onClose}: ActivityFormConsumerProps<CreateActivityValues>) => {
    const submitActivity = useCallback(async () => {
        form.validateFields().then((values) => {
            createActivity(values).then(() => {
                notify("success", "Success", "Activity created");
                onClose();
            })
            .catch(error => {
                notify("error", "Could not create activity", "Failed");
            });
        })
    }, [form]);

    return (
        <ActivityFormConsumer onSubmit={submitActivity} onCancel={onClose} submitLabel={"Create"} />
    )
}

export const UpdateActivityFormConsumer = ({form, onClose, refreshGrid, activityGuid}: ActivityFormConsumerProps<UpdateActivityValues>) => {
    const submitActivityUpdate = useCallback(async () => {
        form.validateFields().then((values) => {
            if(activityGuid) {
                updateActivity({...values, activityGuid}).then((result) => {
                    refreshGrid?.(result);
                    notify("success", "Success", "Activity updated");
                    onClose();
                }).catch(error => {
                    notify("error", "Could not update activity", "Failed");
                });
            }
        });
        
    }, [form]);

    return (
        <ActivityFormConsumer onSubmit={submitActivityUpdate} onCancel={onClose} submitLabel={"Update"} />
    )
}
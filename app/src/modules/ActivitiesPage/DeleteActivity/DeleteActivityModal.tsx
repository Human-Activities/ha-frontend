import { useEffect } from "react";
import { HaButton, HaModal, HaModalProps } from "../../../components";
import { Activity } from "../../../model/types.api";
import { HaModalState, useModal } from "../../../model/utils";
import { deleteActivity } from "../../../services";

import "./DeleteActivity.scss";

type DeleteActivityProps = {
    activity: Activity;
    modal: HaModalState;
}

export const useDeleteActivityModal = (): HaModalState => {
    const modal = useModal<Activity>({ title: 'Delete activity', variant: 'medium' });
    return modal;
}

export const DeleteActivityModal = ({ activity, modal }: DeleteActivityProps) => {
    const { isOpen, props } = modal;
    const footer = useDeleteActivityModalFooter(props);

    return(
        <HaModal 
        {...props} 
        open={isOpen} 
        onOk={() => deleteActivity(activity.guid)}
        footer={footer}
        >
            <div className="confirmationBody">Are you sure you want to delete activity <i>{activity.title}</i>?</div>
        </HaModal>
    )
}

const useDeleteActivityModalFooter = ({onOk, onCancel}: HaModalProps) => 
    [
        <HaButton key="cancel" type="primary" onClick={onCancel} label='Cancel'/>,
        <HaButton key="submit" type="primary" variant="negative" onClick={onOk} label='Delete' htmlType="submit"/>
    ];
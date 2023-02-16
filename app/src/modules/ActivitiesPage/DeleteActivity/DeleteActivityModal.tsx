import { Trans, useTranslation } from "react-i18next";
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
    const { t } = useTranslation("activities")
    const modal = useModal<Activity>({ title: t("modals.delete.title"), variant: 'medium' });
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
            <div className="confirmationBody">
                <Trans i18nKey="activities:modals.delete.confirmationMessage" values={{activityTitle: activity.title}} components={[<i />]} />
            </div>
        </HaModal>
    )
}

const useDeleteActivityModalFooter = ({onOk, onCancel}: HaModalProps) => 
    [
        <HaButton key="cancel" type="primary" onClick={onCancel} label='Cancel'/>,
        <HaButton key="submit" type="primary" variant="negative" onClick={onOk} label='Delete' htmlType="submit"/>
    ];
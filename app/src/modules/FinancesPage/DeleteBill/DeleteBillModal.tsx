import { useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { HaButton, HaModal, HaModalProps } from "../../../components";
import { Bill } from "../../../model/types.api";
import { HaModalState, notify, useModal } from "../../../model/utils";
import { deleteBill } from "../../../services/finances";

import "./DeleteBill.scss";

type DeleteBillProps = {
    bill: Bill;
    modal: HaModalState;
    refreshGrid: () => void;
}

export const useDeleteBillModal = (): HaModalState => {
    const { t } = useTranslation("activities")
    const modal = useModal({ title: t("modals.delete.title"), variant: 'medium' });
    return modal;
}

export const DeleteBillModal = ({ bill, modal, refreshGrid }: DeleteBillProps) => {
    const { isOpen, close, props } = modal;

    const deleteBillAndRefreshGrid = useCallback(async () => {
        try {
            await deleteBill(bill.billGuid);
            refreshGrid();
            notify("success", "Succes", "Bill deleted");
            close();
        } catch(err) {
            notify("success", "Error", "Could not delete bill");
        }
    }, [bill.billGuid]);

    const footer = useDeleteBillModalFooter({ ...props, onOk: deleteBillAndRefreshGrid});

    return(
        <HaModal 
        {...props} 
        open={isOpen} 
        onOk={() => deleteBillAndRefreshGrid()}
        footer={footer}
        >
            <div className="confirmationBody">
                <Trans i18nKey="finances:modals.delete.confirmationMessage" values={{billNumber: bill.accountBillNumber}} components={[<i />]} />
            </div>
        </HaModal>
    )
}

const useDeleteBillModalFooter = ({ onOk, onCancel }: HaModalProps) => 
    [
        <HaButton key="cancel" type="primary" onClick={onCancel} label='Cancel'/>,
        <HaButton key="submit" type="primary" variant="negative" onClick={() => onOk?.()} label='Delete'/>
    ];
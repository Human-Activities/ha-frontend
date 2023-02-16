import { Trans, useTranslation } from "react-i18next";
import { HaButton, HaModal, HaModalProps } from "../../../components";
import { Bill } from "../../../model/types.api";
import { HaModalState, useModal } from "../../../model/utils";
import { deleteBill } from "../../../services/finances";

import "./DeleteBill.scss";

type DeleteBillProps = {
    bill: Bill;
    modal: HaModalState;
}

export const useDeleteBillModal = (): HaModalState => {
    const { t } = useTranslation("activities")
    const modal = useModal<Bill>({ title: t("modals.delete.title"), variant: 'medium' });
    return modal;
}

export const DeleteBillModal = ({ bill, modal }: DeleteBillProps) => {
    const { isOpen, props } = modal;
    const footer = useDeleteBillModalFooter(props);

    return(
        <HaModal 
        {...props} 
        open={isOpen} 
        onOk={() => deleteBill(bill.guid)}
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
        <HaButton key="submit" type="primary" variant="negative" onClick={onOk} label='Delete' htmlType="submit"/>
    ];
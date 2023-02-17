
import { useCallback } from "react";
import { HaButton } from "../../../components";
import { Bill } from "../../../model/types.api";
import { BillFormValues, CreateBillValues, UpdateBillValues } from "../../../model/types.app";
import { notify } from "../../../model/utils";
import { createBill, updateBill } from "../../../services/finances";
import "./CreateUpdateBill.scss";

type Props = {
    submitLabel: string;
    onSubmit: () => void;
    onCancel: () => void;
}

export type BillFormConsumerProps<T extends BillFormValues> = {
    bill: T;
    onClose: () => void;
    refreshGrid?: (newBill: Bill) => void;
}

export const BillFormConsumer = ({ onSubmit, onCancel, submitLabel }: Props) => {
    return (
        <div className="bill-consumer-actions">
            <HaButton onClick={() => onCancel()}>Cancel</HaButton>
            <HaButton onClick={() => onSubmit()} variant="positive">{submitLabel}</HaButton>
        </div>
    )
}

export const CreateBillFormConsumer = ({bill, onClose}: BillFormConsumerProps<CreateBillValues>) => {
    const submitBill = useCallback(async () => {
        if(bill.name && bill.name.length) {
            const items = bill.billItems.filter(item => item.name !== null || item.name !== "" || item.totalValue !== null);
            if (items.length) {
                try {
                    await createBill({...bill, billItems: items});
                    notify('success', 'Success', 'Bill created')
                    onClose();
                } catch (err) {
                    notify('error', 'Error', (err as any).message);
                }
            }
        }
    }, [bill]);

    return (
        <BillFormConsumer onSubmit={submitBill} onCancel={onClose} submitLabel={"Create"} />
    )
}

export const UpdateBillFormConsumer = ({bill, onClose, refreshGrid}: BillFormConsumerProps<UpdateBillValues>) => {
    const submitBill = useCallback(async () => {
        if(bill.name && bill.name.length) {
            const items = bill.billItems.filter(item => item.name !== null || item.name !== "" || item.totalValue !== null);
            if (items.length) {
                try {
                    const result = await updateBill(bill);
                    refreshGrid?.(result);
                    notify('success', 'Success', 'Bill updated')
                } catch (err) {
                    notify('error', 'Error', (err as any).message);
                }
            }
        }
    }, [bill]);

    return (
        <BillFormConsumer onSubmit={submitBill} onCancel={onClose} submitLabel={"Update"} />
    )
}
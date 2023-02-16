
import { useCallback } from "react";
import { HaButton } from "../../../components";
import { BillFormValues, CreateBillValues, UpdateBillValues } from "../../../model/types.app";
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
}

const BillFormConsumer = ({ onSubmit, onCancel, submitLabel }: Props) => {
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
            const items = bill.items.filter(item => item.name === null || item.name === "" || item.price === null);
            if (items.length) {
                await createBill(bill);
            }
        }
    }, [])

    return (
        <BillFormConsumer onSubmit={submitBill} onCancel={onClose} submitLabel={"Create"} />
    )
}

export const UpdateBillFormConsumer = ({bill, onClose}: BillFormConsumerProps<UpdateBillValues>) => {
    const submitBill = useCallback(async () => {
        if(bill.name && bill.name.length) {
            const items = bill.items.filter(item => item.name === null || item.name === "" || item.price === null);
            if (items.length) {
                await updateBill(bill);
            }
        }
    }, [])

    return (
        <BillFormConsumer onSubmit={submitBill} onCancel={onClose} submitLabel={"Update"} />
    )
}
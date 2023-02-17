import { useContext, useState } from "react";
import { AppContext, AppContextType } from "../../../context";
import { CreateBillForm } from "./BillForm"
import { UpdateBillValues } from "../../../model/types.app";

import "./CreateUpdateBill.scss";
import { Bill } from "../../../model/types.api";
import { UpdateBillFormConsumer } from "./BillFormConsumer";

type Props = {
    billReference: Bill;
    closeTab: () => void;
    refreshGrid: () => void;
};

export const UpdateBillTab = ({ billReference, closeTab, refreshGrid }: Props) => {
    const [bill, setBill] = useState<UpdateBillValues>({ 
        userGuid: billReference.userGuid,
        billGuid: billReference.billGuid, 
        billItems: billReference.billItems.map((item, i) => 
            ({ number: (i+1), name: item.name, totalValue: item.totalValue, categoryId: item.categoryId, userGuid: item.author.userGuid })), 
        name: billReference.name 
    });

    const updateAndRefresh = (newBill: Bill) => {
        setBill({ 
            userGuid: newBill.userGuid,
            billGuid: newBill.billGuid, 
            billItems: newBill.billItems.map((item, i) => 
                ({ number: (i+1), name: item.name, totalValue: item.totalValue, categoryId: item.categoryId, userGuid: item.author.userGuid })), 
            name: newBill.name 
        })
        refreshGrid();
    }

    return (
        <>
            <CreateBillForm bill={bill} updateBill={setBill} />
            <UpdateBillFormConsumer onClose={closeTab} bill={bill} refreshGrid={(newBill: Bill) => updateAndRefresh(newBill)}/>
        </>
    )
}
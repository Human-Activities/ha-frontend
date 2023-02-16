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
};

export const UpdateBillTab = ({ billReference, closeTab }: Props) => {
    const [bill, setBill] = useState<UpdateBillValues>({ 
        userGuid: billReference.userGuid,
        billGuid: billReference.guid, 
        items: billReference.items.map((item, i) => 
            ({ number: (i+1), name: item.name, price: item.price, categoryGuid: item.category.guid, userGuid: item.author.userGuid })), 
        name: billReference.name 
    });

    return (
        <>
            <CreateBillForm bill={bill} updateBill={setBill} />
            <UpdateBillFormConsumer onClose={closeTab} bill={bill} />
        </>
    )
}
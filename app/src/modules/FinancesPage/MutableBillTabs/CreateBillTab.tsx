import { useCallback, useContext, useState } from "react";
import { AppContext, AppContextType } from "../../../context";
import { CreateBillForm } from "./BillForm"
import { CreateBillValues } from "../../../model/types.app";

import "./CreateUpdateBill.scss";
import { BillFormConsumer, CreateBillFormConsumer } from "./BillFormConsumer";
import { createBill } from "../../../services/finances";
import { notify } from "../../../model/utils";

type Props = {
    groupGuid?: string;
    closeTab: () => void;
}

export const CreateBillTab = ({ groupGuid, closeTab }: Props) => {
    const { user: { userGuid } } = useContext(AppContext) as AppContextType;
    const [bill, setBill] = useState<CreateBillValues>({ userGuid, groupGuid, items: [], name: "" })

    return (
        <>
            <CreateBillForm bill={bill} updateBill={setBill} />
            <CreateBillFormConsumer onClose={closeTab} bill={bill} />
        </>
    )
}


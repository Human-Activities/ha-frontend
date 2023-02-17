import { useCallback, useContext, useState } from "react";
import { AppContext, AppContextType } from "../../../context";
import { CreateActivityValues, CreateBillValues } from "../../../model/types.app";

import "./CreateUpdateBill.scss";
import { notify } from "../../../model/utils";
import { CreateActivityForm } from "../CreateActivity/CreateActivityForm";
import { useForm } from "antd/es/form/Form";
import { CreateActivityFormConsumer } from "./ActivityFormConsumer";

type Props = {
    groupGuid?: string;
    closeTab: () => void;
}

export const CreateActivityTab = ({ groupGuid, closeTab }: Props) => {
    const { user: { userGuid } } = useContext(AppContext) as AppContextType;
    const [createActivityForm] = useForm<CreateActivityValues>();
    const [activity, setActivity] = useState<CreateActivityValues>({
        name: "",
        userGuid,
        groupGuid,
        description: "",
        isPublic: false,
    })

    return (
        <>
            <CreateActivityForm form={createActivityForm} />
            <CreateActivityFormConsumer onClose={closeTab} form={createActivityForm} />
        </>
    )
}


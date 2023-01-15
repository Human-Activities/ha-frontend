import React from "react"
import { useForm } from "antd/es/form/Form"
import { HaModal } from "../../../components"
import { FormModalInstance } from "../../../model/types.app"
import { useModal } from "../../../model/utils"
import { CreateActivityForm, CreateActivityValues } from "./CreateActivityForm"

type CreateActivityProps = {
    formModal: FormModalInstance<CreateActivityValues>;
    isGroupActivity?: boolean;
}

export const useCreateActivityModal = (): FormModalInstance<CreateActivityValues> => {
    const [createActivityForm] = useForm<CreateActivityValues>();

    const createActivity = (values: CreateActivityValues) => {
        console.log(values)
        modal.close();
    }

    const modal = useModal('Create activity', 'large', {instance: createActivityForm, onFetch: createActivity});
    return { modal: modal, form: createActivityForm}
}

export const CreateActivityModal = ({formModal, isGroupActivity}: CreateActivityProps) => {
    const { modal: { isOpen, props }, form } = formModal;
    return(
        <HaModal {...props} open={isOpen} >
            <CreateActivityForm form={form} isGroupActivity={isGroupActivity} />
        </HaModal>
    )
}
import { FormInstance } from "antd"
import { useForm } from "antd/es/form/Form"
import { HaModal } from "../../../components"
import { FormModalInstance } from "../../../model/types.app"
import { ModalState, useModal } from "../../../model/utils"
import { CreateActivityForm, CreateActivityValues } from "./CreateActivityForm"


export const useCreateActivityModal = (): FormModalInstance<CreateActivityValues> => {
    const [createActivityForm] = useForm<CreateActivityValues>();

    const createActivity = (values: CreateActivityValues) => {
        modal.close();
    }

    const modal = useModal('Create activity', 'large', {instance: createActivityForm, onFetch: createActivity});
    return { modal: modal, form: createActivityForm}
}

export const CreateActivityModal = ({modal, form}: FormModalInstance<CreateActivityValues>) => {
    const { isOpen, props } = modal;
    return(
        <HaModal {...props} open={isOpen} >
            <CreateActivityForm form={form} />
        </HaModal>
    )
}
import { FormInstance } from "antd";
import { useCallback, useState } from "react";
import { HaModalProps } from "../../components";

export type ModalFormParams<T> = {
    instance : FormInstance<any>,
    onFetch: (value: T) => void;
}

export const useModal = (
    title: string, 
    size: 'large' | 'default' | 'small' = 'default', 
    form?: ModalFormParams<any>, 
    spinner?: boolean
    ): [boolean, () => void, ()=> void, HaModalProps, (() => any)?] => 
    {
        const [isModalOpen, setModalOpen] = useState(false);

        const modalProps: HaModalProps = {
            title: title, 
            width: size === 'large' ? 850 : size === 'small' ?  300 : 600, 
            onCancel: () => closeModal(),
            onOk: () => { if (form != null) fetchFormValues() },
            loading: spinner,
            maskClosable: false
        }

        const showModal = useCallback(() => setModalOpen(true),[]);
        const closeModal = useCallback(() => {
            if (form != null) {
                form.instance.resetFields();
            }
            setModalOpen(false)
        }, []);

        const fetchFormValues = () => {
            if (form != null) {
                form.instance.validateFields()
                .then((values) => {
                    form.onFetch(values);
                })
                .catch((info) => {
                console.log('Validate Failed:', info);
                });
            }
        }

    if (form != null) {    
        return [isModalOpen, showModal, closeModal, modalProps, fetchFormValues];
    } else {
        return [isModalOpen, showModal, closeModal, modalProps];
    }
}
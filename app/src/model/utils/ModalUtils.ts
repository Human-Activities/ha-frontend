import { FormInstance } from "antd";
import { useCallback, useState } from "react";
import { HaModalProps } from "../../components/HaModal";
import { ModalVariant } from "../../components/HaModal/HaModal";

export type ModalFormParams<T> = {
    instance : FormInstance<T>,
    onFetch: (value: T) => void;
}

export type ModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    props: HaModalProps;
    fetcher?: () => any;
}

export const useModal = (
    title?: string, 
    variant?: ModalVariant,
    form?: ModalFormParams<any>, 
    spinner?: boolean
    ): ModalState => 
    {
        const [isModalOpen, setModalOpen] = useState(false);

        const modalProps: HaModalProps = {
            title: title, 
            variant: variant || 'small',
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
        return {isOpen: isModalOpen, open: showModal, close: closeModal, props: modalProps, fetcher: fetchFormValues};
    } else {
        return {isOpen: isModalOpen, open: showModal, close: closeModal, props: modalProps};
    }
}
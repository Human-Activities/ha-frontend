import { FormInstance } from "antd";
import { useCallback, useState } from "react";
import { HaModalProps } from "../../components/HaModal";
import { ModalVariant } from "../../components/HaModal/HaModal";

export type HaModalFormParams<T> = {
    instance : FormInstance<T>,
    onFetch: (value: T) => void;
}

export type HaModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    props: HaModalProps;
    fetcher?: (value?: any) => any;
}

type HaModalHookParams = {
    title?: string, 
    variant?: ModalVariant,
    form?: HaModalFormParams<any>, 
    onOk?: (value?: any) => any,
    spinner?: boolean
}

export const useModal = ({
    title, 
    variant,
    form,
    onOk,
    spinner,
}: HaModalHookParams): HaModalState => 
{
        const [isModalOpen, setModalOpen] = useState(false);

        const modalProps: HaModalProps = {
            title: title, 
            variant: variant || 'small',
            onCancel: () => closeModal(),
            onOk: () => { form != null && fetchFormValues() },
            loading: spinner,
            maskClosable: false
        }

        const showModal = useCallback(() => setModalOpen(true), []);
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

    return {isOpen: isModalOpen, open: showModal, close: closeModal, props: modalProps, fetcher: form ? fetchFormValues : onOk};
}
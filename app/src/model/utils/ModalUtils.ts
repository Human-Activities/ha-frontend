import { FormInstance } from "antd";
import { useCallback, useState } from "react";
import { HaModalProps } from "../../components/HaModal";
import { ModalVariant } from "../../components/HaModal/HaModal";

export type HaModalFormParams<T> = {
    instance : FormInstance<T>,
    onFetch: (value: T) => void;
}

export type HaModalState<TData = {}> = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    data?: TData;
    props: HaModalProps;
    fetcher?: () => any;
}

type HaModalHookParams<TData> = {
    title?: string, 
    variant?: ModalVariant,
    form?: HaModalFormParams<any>, 
    data?: TData,
    spinner?: boolean
}

export const useModal = <TData = {}, >({
    title, 
    variant,
    form,
    data,
    spinner,
    }: HaModalHookParams<TData>): HaModalState<TData> => 
{
        const [isModalOpen, setModalOpen] = useState(false);
        const [modalData] = useState(data);

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
        return {isOpen: isModalOpen, open: showModal, close: closeModal, data: modalData, props: modalProps, fetcher: fetchFormValues};
    } else {
        return {isOpen: isModalOpen, open: showModal, close: closeModal, data: modalData, props: modalProps};
    }
}
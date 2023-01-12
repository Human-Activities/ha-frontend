import { useCallback, useState } from "react";
import { HaButton, HaModalProps } from "../../components";


export const useModal = (title: string, size?: 'large' | 'default' | 'small', onOkCallback?: () => void, spinner?: boolean): [boolean, () => void, ()=> void, HaModalProps] => {
    const [isModalOpen, setModalOpen] = useState(false);
    const modalProps: HaModalProps = {
        title: title, 
        width: size === 'large' ? 850 : size === 'small' ?  300 : 600, 
        onCancel: () => closeModal(),
        onOk: () => onOkCallback ? onOkCallback() : undefined,
        loading: spinner
    }
    const showModal = useCallback(() => setModalOpen(true),[]);
    const closeModal = useCallback(() => setModalOpen(false), []);

    return [isModalOpen, showModal, closeModal, modalProps];
}
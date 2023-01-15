import { Modal } from "antd"
import React, { ReactNode } from "react"
import HaButton from "../HaButton";
import "./HaModal.scss";

export type ModalVariant = 'large' | 'medium' | 'small';

export type HaModalProps = {
    children?: ReactNode;
    title?: string,
    open?: boolean, 
    variant: ModalVariant, 
    onCancel?: () => void,
    onOk?: () => void
    footer?: ReactNode,
    loading?: boolean,
    positionTop?: 'centered' | number,
    maskClosable?: boolean
}


export const HaModal = (props: HaModalProps) => {
    const { variant } = props;
    const width = variant === 'small' ? 300 : variant === 'medium' ? 600 : 850;
    return (
        <Modal className="modal" open={props.open} title={props.title} width={width} 
            onCancel={props.onCancel} onOk={props.onOk}
            confirmLoading={props.loading}
            footer={props.footer ?? [
                <HaButton key="cancel" type="primary" onClick={props.onCancel} label='Cancel'/>,
                <HaButton key="submit" type="primary" onClick={props.onOk} label='Save' htmlType="submit"/>
            ]}
            centered={props.positionTop === 'centered'}
            maskClosable={props.maskClosable}
            style={{
                top: props.positionTop !=='centered' && props.positionTop != null ? props.positionTop : 'auto',
                padding: '2em',
                gap: '1em',
                }}>
            {props.children}
        </Modal>
    )
}
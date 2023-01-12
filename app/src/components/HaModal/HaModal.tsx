import { Modal } from "antd"
import React, { ReactNode } from "react"
import HaButton from "../HaButton";

export type HaModalProps = {
    children?: ReactNode;
    title: string,
    open?: boolean, 
    width?: number, 
    onCancel?: () => void,
    onOk?: () => void
    footer?: ReactNode,
    loading?: boolean
}


export const HaModal = (props: HaModalProps) => {
    return (
        <Modal open={props.open} title={props.title} width={props.width} 
            onCancel={props.onCancel} onOk={props.onOk}
            confirmLoading={props.loading}
            footer={props.footer ?? [
                <HaButton type="primary" onClick={props.onCancel} label='Cancel'/>,
                <HaButton type="primary" onClick={props.onOk} label='Save' htmlType="submit"/>
            ]}>
            {props.children}
        </Modal>
    )
}
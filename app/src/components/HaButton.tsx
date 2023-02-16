import React, { ReactNode } from "react";
import { Button } from "antd";
import cx from "classnames";

import "./HaButton.scss";

type HaButtonProps = {
    onClick?: () => void;
    type?: 'primary' | 'default' | 'link' | 'text';
    size?: 'large' | 'medium' | 'small';
    htmlType?: 'submit' | 'reset' | 'button';
    label?: string
    children?: ReactNode;
    icon?: any;
    style?: React.CSSProperties;
    variant?: 'neutral' | 'positive' | 'negative';
    disabled?: boolean;
}

const HaButton: React.FC<HaButtonProps> = ({variant = 'neutral', ...props}: HaButtonProps) => {
    return <Button
        size={
        props.size == 'large' ? 'large' : 
            props.size == 'small' ? 'small' : 'middle'
        } 
        type={props.type || 'default'} 
        className={
            cx(
            props.type === 'primary' || props.type === 'default' ? 'primary' : 'default', 
            variant === 'negative' ? 'negative' : variant === 'positive' ? 'positive' : '',
            )}
        style={{
            ...props.style
        }} 
        onClick={props.onClick}
        htmlType={props.htmlType || 'button'}
        icon={props.icon}
        disabled={props.disabled}
        >{props.label || props.children}</Button>
}

export default HaButton;
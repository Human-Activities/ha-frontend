import React, { ReactNode } from "react";
import { Button } from "antd";

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
}


const HaButton: React.FC<HaButtonProps> = ({variant = 'neutral', ...props}: HaButtonProps) => {
    return <Button
        size={
        props.size == 'large' ? 'large' : 
            props.size == 'small' ? 'small' : 'middle'
        } 
        type={props.type || 'default'} 
        style={{
            ...props.style, 
            background: props.type === 'primary' || props.type === 'default' ? 'orange' : '',
            color: variant === 'neutral' ? 'inherit' : variant === 'positive' ? 'var(--color-dark-green)' : 'var(--color-dark-red)',
        }} 
        onClick={props.onClick}
        htmlType={props.htmlType || 'button'}
        icon={props.icon}
        >{props.label || props.children}</Button>
}

export default HaButton;
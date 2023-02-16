import React from "react";
import { Checkbox, Form, FormInstance, Input } from "antd"
import { HaSelect, HaTooltipIcon } from "../../../components";
import "./CreateActivity.scss";
import { useTranslation } from "react-i18next";

export type CreateActivityValues = {
    name: string;
    categories: number[];
    description: string;
    isPublic: boolean;
}

type CreateActivityFormProps = {
    form: FormInstance<CreateActivityValues>;
    isGroupActivity?: boolean;
}

export const CreateActivityForm = ({ form, isGroupActivity }: CreateActivityFormProps) => {
    const { t } = useTranslation("activities");

    return (
        <div className="formWrapper">
            <Form form={form} layout="vertical" colon={false} labelCol={{ span: 10 }} className="createActivityForm">
                <Form.Item
                    label={t("details.name")}
                    name="name"
                    rules={[ {required: true, message: t("details.validation.name"), type: 'string', whitespace: true}]}
                >
                    <Input id="name"/>
                </Form.Item>
                <Form.Item
                    label={t("details.category")}
                    name="category"
                    rules={[ {required: false }]}
                >
                    <HaSelect  options={[{value: 1, label: "test 1"}, {value: 2, label: "test 2"}]} multi onChange={(value) => console.log(value)}/>
                </Form.Item>
                <Form.Item
                    label={t("details.description")}
                    name="description"
                    rules={[ {required: true, message: t("details.validation.description"), type: 'string', whitespace: true}]}
                >
                    <Input id="description"/>
                </Form.Item>
                <Form.Item
                    name="isPublic"
                    valuePropName="checked"
                >
                    <Checkbox name="isPublic" id="isPublic" defaultChecked={isGroupActivity} disabled={isGroupActivity}>
                        <CheckboxLabel label={t("details.share.label")} tooltip={t("details.share.tooltip")}/>
                    </Checkbox>
                </Form.Item>
            </Form>
        </div>
    )
}

type CheckboxLabelProps = {
    label: string;
    tooltip: string;
}

const CheckboxLabel = ({label, tooltip}: CheckboxLabelProps) => {
    return (
        <div style={{display: "flex", gap: "0.5em", alignItems: "center", cursor: "default" }}>
            <span style={{color: "black"}}>{label}</span>
            <HaTooltipIcon text={tooltip}/>
        </div>
    )
}
import React, { useContext } from "react";
import { Checkbox, Form, FormInstance, Input } from "antd"
import { HaSelect, HaTooltipIcon } from "../../../components";
import "./CreateActivity.scss";
import { useTranslation } from "react-i18next";
import { ActivityFormValues, UpdateActivityValues } from "../../../model/types.app";
import { AppContext, AppContextType } from "../../../context";
import TextArea from "antd/es/input/TextArea";

type CreateActivityFormProps = {
    form: FormInstance<ActivityFormValues>;
    isGroupActivity?: boolean;
    activity?: UpdateActivityValues;
}

export const CreateActivityForm = ({ form, isGroupActivity, activity }: CreateActivityFormProps) => {
    const { t } = useTranslation("activities");
    const { appData: { activityCategories }} = useContext(AppContext) as AppContextType;

    return (
        <div className="activity-form-wrapper">
            <Form form={form} layout="vertical" colon={false} labelCol={{ span: 10 }} className="createActivityForm" initialValues={activity}>
                <Form.Item
                    label={t("details.name")}
                    name="name"
                    rules={[ {required: true, message: t("details.validation.name"), type: 'string', whitespace: true}]}
                >
                    <Input id="name" />
                </Form.Item>
                <Form.Item
                    label={t("details.category")}
                    name="categoryId"
                    rules={[ {required: false }]}
                >
                    <HaSelect 
                        defaultValue={activity?.categoryId} 
                        options={activityCategories.map(c => ({value: c.id, label: c.name}))} 
                        onChange={value => form.setFieldValue("categoryId", value as number)}/>
                </Form.Item>
                <Form.Item
                    label={t("details.description")}
                    name="description"
                    rules={[ {required: true, message: t("details.validation.description"), type: 'string', whitespace: true}]}
                >
                    <TextArea rows={2} id="description" />
                </Form.Item>
                <Form.Item
                    name="isPublic"
                    valuePropName="checked"
                >
                    <Checkbox name="isPublic" id="isPublic" defaultChecked={activity?.isPublic || isGroupActivity} disabled={isGroupActivity}>
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
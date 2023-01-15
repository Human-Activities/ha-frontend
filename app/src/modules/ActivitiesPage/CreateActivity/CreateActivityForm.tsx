import React from "react";
import { Checkbox, Form, FormInstance, Input } from "antd"
import { HaSelect, HaTooltipIcon } from "../../../components";

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
    return (
        <Form form={form} layout="vertical" colon={false} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item
                label="Activity name"
                name="name"
                rules={[ {required: true, message: 'Provide activity name', type: 'string', whitespace: true}]}
            >
                <Input id="name"/>
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[ {required: false }]}
            >
                <HaSelect  options={[{value: 1, label: "test 1"}, {value: 2, label: "test 2"}]} multi onChange={(value) => console.log(value)}/>
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[ {required: true, message: 'Provide a short description', type: 'string', whitespace: true}]}
            >
                <Input id="description"/>
            </Form.Item>
            <Form.Item
                name="isPublic"
                valuePropName="checked"
            >
                <Checkbox name="isPublic" id="isPublic" defaultChecked={isGroupActivity} disabled={isGroupActivity}><CheckboxLabel /></Checkbox>
            </Form.Item>
        </Form>
    )
}

const CheckboxLabel = () => {
    return (
        <div style={{display: "flex", gap: "0.5em", alignItems: "center", cursor: "default" }}>
            <span style={{color: "black"}}>Share</span>
            <HaTooltipIcon text="Check this box to share the activity with your group or friends"/>
        </div>
    )
}
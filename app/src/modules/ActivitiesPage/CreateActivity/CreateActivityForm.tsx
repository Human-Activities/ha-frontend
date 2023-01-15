import { Checkbox, Form, Input } from "antd"
//import { HaSelect } from "../../../components";
import { FormProps } from "../../../model/types.app";

export type CreateActivityValues = {
    name: string;
    category: string;
    description: string;
    isPublic: boolean;
}

export const CreateActivityForm = ({ form }: FormProps<CreateActivityValues>, isGroupActivity?: boolean) => {
    return (
        <Form form={form} layout="vertical" colon={false} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item
                label="Activity name"
                name="name"
                rules={[ {required: true, message: 'Provide activity name', type: 'string', whitespace: true}]}
            >
                <Input id="name"/>
            </Form.Item>
            {/* TODO */}
            {/* <Form.Item
                label="Category"
                name="category"
                rules={[ {required: false }]}
            >
                <HaSelect options={[{value: 1, label: "test 1"}, {value: 2, label: "test 2"}]} multi onChange={(value) => console.log(value)}/>
            </Form.Item> */}
            <Form.Item
                label="Description"
                name="description"
                rules={[ {required: true, message: 'Provide a short description', type: 'string', whitespace: true}]}
            >
                <Input id="description"/>
            </Form.Item>
            <Form.Item
                //label="Share"
                //wrapperCol={{span: 30}}
                // labelCol={{span: 30}}
                // style={{display: 'flex', flexDirection: 'row'}}
                // tooltip="Check this box to share the activity with your group or friends"
                name="isPublic"
            >
                <Checkbox id="isPublic" checked={isGroupActivity} disabled={isGroupActivity}><span style={{color: "black"}}>Share</span></Checkbox>
            </Form.Item>
        </Form>
    )
}
import { Form, FormInstance, Input } from "antd"
import { FormProps } from "../../../model/types.app"

export const CreateGroupForm = ({form}: FormProps<any>) => {
    return (
        <Form form={form} style={{height: '6em'}}>
            <Form.Item
                    label="Group Name"
                    name="name"
                    rules={[ {required: true, message: 'Group name is required!', type: 'string', whitespace: true}]}
            >
                <Input id="inpGroupName"/>
            </Form.Item>
        </Form>
    )
}
import { Form, FormInstance, Input } from "antd"

export type CreateGroupFormProps = {
    form?: FormInstance<any>;
}

export const CreateGroupForm = ({form}: CreateGroupFormProps) => {
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
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { DatePicker, Form, Input} from "antd";
import React, { useContext } from "react";
import { HaButton } from "../../../components";
import { AppContext, AppContextType } from "../../../context";
import { notify, RequestStatus } from "../../../model/utils";
import './LoginForm.scss';

type LoginFormProps = {
    register?: boolean;
    onFinish: (values: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const { loginWithGoogle } = useContext(AppContext) as AppContextType;
    const loginWithGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        const credential = credentialResponse.credential;
        if(credential) {
            await loginWithGoogle(credential);;
        }
        notify("error", "Google failure", "Could not login with Google")
    } 
    
    return (
        <Form name="loginForm" onFinish={props.onFinish}>
            <Form.Item
                className="form-item"
                label="Login"
                name="login"
                rules={[ {required: true, message: 'Login is required!'}]}
            >
                <Input id="inpLogin"/>
            </Form.Item>
            <Form.Item
                className="form-item"
                label="Password"
                name="password"
                rules={[ {required: true, message: 'Password is required!'}]}
            >
                <Input.Password id="inpPassword"/>
            </Form.Item>
            { props.register &&
            <>
                <Form.Item
                    className="form-item"
                    label="First name"
                    name="name"
                >
                    <Input id="inpFirstName"/>
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Last name"
                    name="lastName"
                >
                    <Input id="inpLastName"/>
                </Form.Item>
                <Form.Item
                    className="form-item date"
                    label="Date of birth"
                    name="dateOfBirth"
                >
                    <DatePicker format={'DD/MM/YYYY'}/>
                </Form.Item>
            </>
            }
            <Form.Item>
                <HaButton type="primary" size="large" htmlType="submit" label={props.register ? 'Register' : 'Login'}/>
            </Form.Item>
            <GoogleOAuthProvider clientId={"ENTER_CLIEND_ID_HERE"}>
                <GoogleLogin onSuccess={(response) => loginWithGoogleSuccess(response)} onError={() => {}} width="100%"/>
            </GoogleOAuthProvider>
        </Form>
    );
}

export default LoginForm;
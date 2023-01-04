import { Card, Tabs } from "antd";
import React from "react";
import LoginForm from "./LoginForm";
import './LoginPage.scss';

const LoginPage: React.FC = () => {

    const onFormFinish = (formData: any) => {
        console.log(formData)
    }
    const tabsDef = [
        {
            label: 'Register',
            key: 'register',
            children: <LoginForm register onFinish={onFormFinish}/> 
        }, 
        {
            label: 'Login',
            key: 'login',
            children: <LoginForm onFinish={onFormFinish}/>
        }
    ]
    return (
        <div className="ha-v-flexbox align-center" style={{margin: 'auto'}}>
            <div className="ha-v-flexbox align-center form-content">
                <Tabs
                    type="card"
                    items={tabsDef}
                />
            </div>
        </div>
    )
}

export default LoginPage;
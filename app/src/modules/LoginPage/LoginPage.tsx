import { Tabs } from "antd";
import {Dayjs} from "dayjs";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, AppContextType } from "../../context";
import { LoginTO, RegisterTO } from "../../model/TOs";
import { DateUtils, RequestStatus } from "../../model/utils";
import LoginForm from "./LoginForm";
import './LoginPage.scss';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState('register');
    const {register, login} = React.useContext(AppContext) as AppContextType;

    const onRegisterFinish = async (formData: any) => {
        const dateOfBirth = DateUtils.clearTime((formData.dateOfBirth as Dayjs)?.toDate())
        const registerTO = {...formData, dateOfBirth: dateOfBirth} as RegisterTO;
        const { status } = await register(registerTO);
        if (status === RequestStatus.SUCCESS) {
            setActiveKey('login');
        }
    }

    const onLoginFinish = async (formData: LoginTO) => {
        const { status } = await login(formData);
        if (status === RequestStatus.SUCCESS) {
            navigate('/panel');
        }
    }
    const tabsDef = [
        {
            label: 'Register',
            key: 'register',
            children: <LoginForm register onFinish={onRegisterFinish}/> 
        }, 
        {
            label: 'Login',
            key: 'login',
            children: <LoginForm onFinish={onLoginFinish}/>
        }
    ]
    return (
        <div className="ha-v-flexbox align-center" style={{margin: 'auto'}}>
            <div className="ha-v-flexbox align-center form-content">
                <Tabs
                    type="card"
                    items={tabsDef}
                    activeKey={activeKey}
                    onTabClick={(key) => setActiveKey(key)}
                />
            </div>
        </div>
    )
}

export default LoginPage;
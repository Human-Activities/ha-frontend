import { notification } from "antd"

export const notify = (type: 'success' | 'error' | 'info' | 'warning', title: string, description: string) => {
    notification[type]({
        message: title,
        description: description,
        placement: 'bottomLeft'
    });
}
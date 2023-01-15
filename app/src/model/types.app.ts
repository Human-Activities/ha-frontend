import { FormInstance } from "antd"
import { ModalState } from "./utils";

export type FormProps<T> = {
    form: FormInstance<T>;
}

export type FormModalInstance<T> = {
    form: FormInstance<T>;
    modal: ModalState;
}
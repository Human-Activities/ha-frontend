import { FormInstance } from "antd"
import React from "react";
import { HaModalState } from "./utils";

export type FormProps<T> = {
    form: FormInstance<T>;
}

export type FormModalInstance<T> = {
    form: FormInstance<T>;
    modal: HaModalState;
}

export type TabItem<T> = {
    label: string;
    key: T;
    children: React.ReactNode;
}
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
    children?: React.ReactNode;
    closable?: boolean;
    closeIcon?: React.ReactNode;
}

export type CreateBillItem = {
    number: number;
    name: string;
    categoryId: number;
    userGuid: string;
    price: number;
};

export interface CreateBillValues {
    name: string;
    userGuid: string;
    groupGuid?: string;
    items: CreateBillItem[];
};

export interface UpdateBillValues {
    userGuid: string;
    billGuid: string;
    name: string;
    items: CreateBillItem[];
};

export type BillFormValues = CreateBillValues | UpdateBillValues;
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
    number?: number;
    name: string;
    categoryId: number;
    userGuid: string;
    totalValue: number;
};

export interface CreateBillValues {
    name: string;
    userGuid: string;
    groupGuid?: string;
    billItems: CreateBillItem[];
};

export interface UpdateBillValues {
    userGuid: string;
    billGuid: string;
    name: string;
    billItems: CreateBillItem[];
};

export type BillFormValues = CreateBillValues | UpdateBillValues;

export interface CreateActivityValues {
    name: string;
    userGuid: string;
    groupGuid?: string;
    description: string;
    isPublic: boolean;
    categoryId?: number;
}

export interface UpdateActivityValues extends CreateActivityValues {
   activityGuid: string;
}

export type ActivityFormValues = CreateActivityValues | UpdateActivityValues;
export type BillItemCategory = {
    id: number;
    name: string;
}

export type ActivityCategory = {
    id: number;
    name: string;
    rankPoints: number;
}

export type Activity = {
    activityGuid: string;
    name: string;
    category: ActivityCategory;
    description: string;
    author: { 
        name: string;
        userGuid: string;
    };
    createdDate: string;
    userGuid: string;
    groupGuid?: string;
    isPublic: boolean;
}

export type Login = {
    login: string;
    password: string;
}

export type Register = {
    login: string;
    password: string;
    name?: string;
    lastName?: string;
    dateOfBirth?: Date;
}

export type Group = {
    groupGuid: string;
    name: string;
    description?: string;
}

export type Bill = {
    billGuid: string;
    userGuid: string;
    groupGuid?: string;
    name: string;
    total: number;
    createDate: string;
    accountBillNumber: number;
    billItems: BillItem[];
}

export type BillItem = {
    billItemGuid: string;
    author: {
        name: string;
        userGuid: string;
    },
    categoryId: number;
    category: BillItemCategory;
    name: string;
    totalValue: number;
}



export enum ToDoListType {
    Base = 0,
    Normal = 1,
    Template = 2
}

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

export type TodoListTemplate = {
    toDoListGuid: string;
    groupGuid?: string;
    userGuid?: string;
    name: string;
    createdDate: string;
    toDoListType: ToDoListType;
    isFavorite: boolean;
    sections: Section[];
}

export type Section = {
    sectionGuid: string;
    name: string;
    tasks: Task[];
}

export type Task = {
    taskGuid: string;
    createdDate: Date;
    name: string;
    isDone: boolean;
    priority: TaskPriority;
}
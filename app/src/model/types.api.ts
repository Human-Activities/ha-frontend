export type Activity = {
    id: number;
    title: string;
    category: string;
    description: string;
    author: string;
    createdDate?: Date;
    isCurrentUserAuthor: boolean; // todo: userId
    isPrivate: boolean;
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
    guid: string;
    name: string;
    description?: string;
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
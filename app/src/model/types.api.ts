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
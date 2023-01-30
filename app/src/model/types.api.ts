export type Activity = {
    guid: number;
    title: string;
    category: string;
    description: string;
    author: string;
    createdDate: string;
    userGuid: string;
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
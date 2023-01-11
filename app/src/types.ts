export type Activity = {
    id: number;
    title: string;
    category: string;
    description: string;
    author: string;
    createdDate?: Date;
    isCurrentUserAuthor: boolean;
    isPrivate: boolean;
}
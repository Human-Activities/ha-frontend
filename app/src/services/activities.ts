import { Activity } from "../model/types.api";

export async function getActivities(onlyForCurrentUser?: boolean): Promise<Activity[]> {
    //todo fetch function
    // const { data } = acios.get("api/activities?forCurrentUser=`${onlyForCurrentUser}`");
    // return data;

    if(onlyForCurrentUser) {
        return [
            {id: 1, title: "Test 5", category: "Sport", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", isCurrentUserAuthor: true, isPrivate: true, author: "Pepe Oh Boi"},
            {id: 2, title: "Tytuł testowy 6", category: "Rachunek", description: "Nowy rachunek", isCurrentUserAuthor: true, isPrivate: true, author: "Pepe Oh Boi"},
            {id: 3, title: "Długi tytuł dla testu karty 7", category: "Rozrywka", isCurrentUserAuthor: true, isPrivate: false, author: "Pepe Oh Boi", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        ];
    }
    return [
        {id: 1, title: "Test 5", category: "Sport", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", isCurrentUserAuthor: true, isPrivate: true, author: "Pepe Oh Boi"},
        {id: 2, title: "Tytuł testowy 6", category: "Rachunek", description: "Nowy rachunek", isCurrentUserAuthor: true, isPrivate: true, author: "Pepe Oh Boi"},
        {id: 4, title: "Test 1", category: "Sport", description: "Nowy sport odkryty", isCurrentUserAuthor: false, isPrivate: false, author: "Gangsta Pepe"},
        {id: 5, title: "Test tytuł 2", category: "Jedzenie", isCurrentUserAuthor: false, isPrivate: false, author: "Pijany drwal", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {id: 6, title: "Test 3", category: "Rozrywka", description: "Dance", isCurrentUserAuthor: false, isPrivate: false, author: "Płonący konar"},
        {id: 7, title: "Tytuł 4", category: "Lista zadań", description: "Pora na wyzwanie", isCurrentUserAuthor: false, isPrivate: false, author: "Pijany drwal"},
        {id: 3, title: "Długi tytuł dla testu karty 7", category: "Rozrywka", isCurrentUserAuthor: true, isPrivate: false, author: "Pepe Oh Boi", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},

    ]
}

export async function getGroupActivities(groupId: number) {
    return Promise.resolve("not implemented");
}

export async function createActivity(activity: Activity) {
    return Promise.resolve("not implemented");
}

export async function updateActivity(activity: Activity) {
    return Promise.resolve("not implemented");
}

export async function deleteActivity(activityId: number) {
    return Promise.resolve("not implemented");
}
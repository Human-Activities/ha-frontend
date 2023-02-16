import { Activity } from "../model/types.api";

export async function getActivities(onlyForCurrentUser?: boolean): Promise<Activity[]> {
    //todo fetch function
    // const { data } = await acios.get("api/activities?forCurrentUser=`${onlyForCurrentUser}`");
    // return data;

    const currentUserGuid = localStorage.getItem("userGuid") || "test";
    if(onlyForCurrentUser) {
        return [
            {guid: 1, title: "Test 5", category: { guid: "test123", name: "Test", rankPoints: 1}, description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi", createdDate: "2022-10-10"},
            {guid: 2, title: "Tytuł testowy 6", category: { guid: "test123", name: "Test", rankPoints: 1}, description: "Nowy rachunek", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi", createdDate: "2022-10-11"},
            {guid: 3, title: "Długi tytuł dla testu karty 7", category: { guid: "test123", name: "Test", rankPoints: 1}, userGuid: currentUserGuid, isPrivate: false, author: "Pepe Oh Boi", createdDate: "2022-10-12", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        ];
    }
    return [
        {guid: 1, title: "Test 5", category: { guid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-10", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi"},
        {guid: 2, title: "Tytuł testowy 6", category: { guid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-11", description: "Nowy rachunek", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi"},
        {guid: 4, title: "Test 1", category: { guid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-09", description: "Nowy sport odkryty", userGuid: "261d1504-598d-4c3a-b4e0-de9f4b7bac2d", isPrivate: false, author: "Gangsta Pepe"},
        {guid: 5, title: "Test tytuł 2", category: { guid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-13", userGuid: "4aa6ae33-e5bc-41bb-9eb5-0ba1b51d30c9", isPrivate: false, author: "Pijany drwal", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {guid: 6, title: "Test 3", category: { guid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-13", description: "Dance", userGuid: "4aa6ae33-e5bc-41bb-9eb5-0ba1b51d30c9", isPrivate: false, author: "Płonący konar"},
        {guid: 7, title: "Tytuł 4", category: { guid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-14", description: "Pora na wyzwanie", userGuid: "4aa6ae33-e5bc-41bb-9eb5-0ba1b51d30c9", isPrivate: false, author: "Pijany drwal"},
        {guid: 3, title: "Długi tytuł dla testu karty 7", createdDate: "2022-10-12", category: { guid: "test123", name: "Test", rankPoints: 1}, userGuid: currentUserGuid, isPrivate: false, author: "Pepe Oh Boi", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    ]
}

export async function getGroupActivities(groupGuid: string): Promise<Activity[]> {
    const currentUserGuid = localStorage.getItem("userGuid") || "test";

    return [
        {guid: 1, title: "Test 5", category: { guid: "test123", name: "Test", rankPoints: 1}, description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi", createdDate: "2022-10-10"},
        {guid: 2, title: "Tytuł testowy 6", category: { guid: "test123", name: "Test", rankPoints: 1}, description: "Nowy rachunek", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi", createdDate: "2022-10-11"},
        {guid: 3, title: "Długi tytuł dla testu karty 7", category: { guid: "test123", name: "Test", rankPoints: 1}, userGuid: currentUserGuid, isPrivate: false, author: "Pepe Oh Boi", createdDate: "2022-10-12", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    ];
}

export async function createActivity(activity: Activity) {
    return Promise.resolve("not implemented");
}

export async function updateActivity(activity: Activity) {
    return Promise.resolve("not implemented");
}

export async function deleteActivity(activityGuid: number) {
    return Promise.resolve("not implemented");
}
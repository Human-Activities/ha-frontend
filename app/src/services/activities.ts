import axios from "axios";
import { Activity } from "../model/types.api";
import { UpdateActivityValues } from "../model/types.app";
import { ApiURL } from "../model/utils";
import { CreateActivityValues } from "../modules/ActivitiesPage/CreateActivity/CreateActivityForm";

export async function getActivities(userGuid: string): Promise<Activity[]> {
    const { data } = await axios.get(`${ApiURL}activities/get/${userGuid}`);
    return data;

    // const currentUserGuid = localStorage.getItem("userGuid") || "test";
    // if(onlyForCurrentUser) {
    //     return [
    //         {activityGuid: 1, title: "Test 5", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi", createdDate: "2022-10-10"},
    //         {activityGuid: 2, title: "Tytuł testowy 6", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, description: "Nowy rachunek", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi", createdDate: "2022-10-11"},
    //         {activityGuid: 3, title: "Długi tytuł dla testu karty 7", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, userGuid: currentUserGuid, isPrivate: false, author: "Pepe Oh Boi", createdDate: "2022-10-12", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    //     ];
    // }
    // return [
    //     {activityGuid: 1, title: "Test 5", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-10", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi"},
    //     {activityGuid: 2, title: "Tytuł testowy 6", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-11", description: "Nowy rachunek", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi"},
    //     {activityGuid: 4, title: "Test 1", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-09", description: "Nowy sport odkryty", userGuid: "261d1504-598d-4c3a-b4e0-de9f4b7bac2d", isPrivate: false, author: "Gangsta Pepe"},
    //     {activityGuid: 5, title: "Test tytuł 2", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-13", userGuid: "4aa6ae33-e5bc-41bb-9eb5-0ba1b51d30c9", isPrivate: false, author: "Pijany drwal", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    //     {activityGuid: 6, title: "Test 3", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-13", description: "Dance", userGuid: "4aa6ae33-e5bc-41bb-9eb5-0ba1b51d30c9", isPrivate: false, author: "Płonący konar"},
    //     {activityGuid: 7, title: "Tytuł 4", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, createdDate: "2022-10-14", description: "Pora na wyzwanie", userGuid: "4aa6ae33-e5bc-41bb-9eb5-0ba1b51d30c9", isPrivate: false, author: "Pijany drwal"},
    //     {activityGuid: 3, title: "Długi tytuł dla testu karty 7", createdDate: "2022-10-12", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, userGuid: currentUserGuid, isPrivate: false, author: "Pepe Oh Boi", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    // ]
}

export async function getGroupActivities(userGuid: string, groupGuid: string): Promise<Activity[]> {
    const { data } = await axios.get(`${ApiURL}activities/get/${userGuid}.${groupGuid}`);
    return data;
    // const currentUserGuid = localStorage.getItem("userGuid") || "test";

    // return [
    //     {activityGuid: 1, title: "Test 5", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi", createdDate: "2022-10-10"},
    //     {activityGuid: 2, title: "Tytuł testowy 6", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, description: "Nowy rachunek", userGuid: currentUserGuid, isPrivate: true, author: "Pepe Oh Boi", createdDate: "2022-10-11"},
    //     {activityGuid: 3, title: "Długi tytuł dla testu karty 7", category: { categoryGuid: "test123", name: "Test", rankPoints: 1}, userGuid: currentUserGuid, isPrivate: false, author: "Pepe Oh Boi", createdDate: "2022-10-12", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    // ];
}

export async function createActivity(activity: CreateActivityValues) {
    const { data } = await axios.post(`${ApiURL}activities/create`, activity);
    return data;
}

export async function updateActivity(activity: UpdateActivityValues) {
    const { data } = await axios.put(`${ApiURL}activities/edit/${activity.activityGuid}`, activity);
    return data;
}

export async function deleteActivity(activityGuid: number) {
    const { data } = await axios.delete(`${ApiURL}activities/edit/${activityGuid}`);
    return data;
}
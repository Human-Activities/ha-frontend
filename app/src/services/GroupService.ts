import axios from "axios";
import { Group } from "../model/types.api";
import { ApiURL, RequestStatus } from "../model/utils";

export class GroupService {
    
    static async create(group: Group) {
        try {
            const { data } = await axios.post(`${ApiURL}groups/create`, group);
            return data
        } catch (error) {
            return null;
        }
    }
    static async getGroups() {
        try {
            const { data } = await axios.get(`${ApiURL}groups/get`);
            return data as Group[]
        } catch (error) {
            return [];
        }
    }
    static async joinGroup(userGuid: string,url?: string) {
        try {
            const {data} = await axios.post(`http://127.0.0.1:8000/pai/${url}`, {user_uuid: userGuid});
            return {data};
        } catch(error) {
            return null;
        }
    }
    static async getGroupLink(groupGuid?: string) {
        
    }
}
import axios from "axios";
import { Group } from "../model/types.api";
import { RequestStatus } from "../model/utils";

const apiUrl = 'https://localhost:7124/api/groups';

export class GroupService {
    
    static async create(group: Group) {
        try {
            const { data } = await axios.post(`${apiUrl}/create`, group);
            return data
        } catch (error) {
            return null;
        }
    }
    static async getGroups() {
        try {
            const { data } = await axios.get(`${apiUrl}/get`);
            return data as Group[]
        } catch (error) {
            return [];
        }
    }
}
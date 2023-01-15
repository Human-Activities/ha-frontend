import axios from "axios";
import { Group } from "../model/types.api";
import { RequestStatus } from "../model/utils";

const apiUrl = 'https://localhost:7124/api/group';

export class GroupService {
    
    static async create(group: Group) {
        try {
            const { data } = await axios.post(`${apiUrl}/create`, group);
            return {status: RequestStatus.SUCCESS, data}
        } catch (error) {
            return {status: RequestStatus.ERROR, error}
        }
    }
    static async getGroups() {
        try {
            const { data } = await axios.get(`${apiUrl}/get`);
            return {status: RequestStatus.SUCCESS, data: data as Group[]}
        } catch (error) {
            return {status: RequestStatus.ERROR, error}
        }
    }
}
import axios from "axios";
import { Group } from "../model/types.api";
import { ApiURL, RequestStatus } from "../model/utils";

export class GroupService {
    
    static async create(group: Group) {
        try {
            const { data } = await axios.post(`${ApiURL}group/create`, group);
            return {status: RequestStatus.SUCCESS, data}
        } catch (error) {
            return {status: RequestStatus.ERROR, error}
        }
    }
    static async getGroups() {
        try {
            const { data } = await axios.get(`${ApiURL}group/get`);
            return {status: RequestStatus.SUCCESS, data: data as Group[]}
        } catch (error) {
            return {status: RequestStatus.ERROR, error}
        }
    }
}
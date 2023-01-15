import axios from "axios";
import { Login, Register } from "../model/types.api";
import { RequestStatus } from "../model/utils";

export class AuthService {
    static async registerAccount(formData: Register) {
        try {
            const { data } = await axios.post("https://localhost:7124/Authentication/register", formData);
            return { status: RequestStatus.SUCCESS, data };
        } catch (err) {
            return { status: RequestStatus.ERROR, err };
        }
    }
    static async login(formData: Login) {
        try {
            const { data } = await axios.post("https://localhost:7124/Authentication/login", formData);
            return { status: RequestStatus.SUCCESS, data };
        } catch (err) {
            return { status: RequestStatus.ERROR, err };
        }
    }
}
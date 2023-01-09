import axios from "axios";
import { LoginTO, RegisterTO } from "../model/TOs";
import { RequestStatus } from "../model/utils";

export class AuthService {
    static async registerAccount(formData: RegisterTO) {
        try {
            const { data } = await axios.post("https://localhost:7124/Authentication/register", formData);
            return { status: RequestStatus.SUCCESS, data };
        } catch (err) {
            return { status: RequestStatus.ERROR, err };
        }
    }
    static async login(formData: LoginTO) {
        try {
            const { data } = await axios.post("https://localhost:7124/Authentication/login", formData);
            return { status: RequestStatus.SUCCESS, data };
        } catch (err) {
            return { status: RequestStatus.ERROR, err };
        }
    }
}
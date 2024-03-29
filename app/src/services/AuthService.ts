import axios from "axios";
import { Login, Register } from "../model/types.api";
import { ApiURL, RequestStatus } from "../model/utils";

export class AuthService {
    static async registerAccount(formData: Register) {
        try {
            const { data } = await axios.post("https://localhost:7124/api/authentication/register", formData);
            return { status: RequestStatus.SUCCESS, data };
        } catch (err) {
            return { status: RequestStatus.ERROR, err };
        }
    }
    static async login(formData: Login) {
        try {
            const { data } = await axios.post("https://localhost:7124/api/authentication/login", formData);
            return { status: RequestStatus.SUCCESS, data };
        } catch (err) {
            return { status: RequestStatus.ERROR, err };
        }
    }
    static async loginWithGoogle(credential: string) {
        try {
            const { data } = await axios.post(`${ApiURL}authentication/google`, { tokenId: credential });
            return { status: RequestStatus.SUCCESS, data };
        } catch(err) {
            return { status: RequestStatus.ERROR, err };
        }
    }
}
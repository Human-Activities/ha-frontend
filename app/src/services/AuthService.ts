import axios from "axios";

export class AuthService {
    static async registerAccount(formData: any) {
        try {
            const { data } = await axios.post('test', formData);
        } catch (err) {
            return;
        }
    }
}
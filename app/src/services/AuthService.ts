import axios from "axios";

export class AuthService {
    static registerAccount(formData: any) {
        try {
            const { data } = await axios.post('test', formData);
        }
    }
}
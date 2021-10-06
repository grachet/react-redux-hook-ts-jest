import { ACCOUNT_TEST } from "../../../constantes/testConstantes";

class AuthService {
    async gapiLogin() {
        return ACCOUNT_TEST;
    };
    async gapiLogout() {
        return true;
    };
}

export default new AuthService();




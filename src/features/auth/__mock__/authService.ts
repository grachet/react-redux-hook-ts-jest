import { GAPI_LOGIN_USER_TEST } from "../../../constantes/testConstantes";

class AuthService {
    async gapiLogin() {
        return GAPI_LOGIN_USER_TEST;
    };
    async gapiLogout() {
        return false;
    };
}

export default new AuthService();




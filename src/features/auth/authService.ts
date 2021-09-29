import { CLIENT_ID_GOOGLE } from "../../constantes/config";
import { ResponseLoginGapiType, GapiType } from "./authTypes";
declare global {
    interface Window { gapi: any; }
}
class AuthService {

    gapi: GapiType

    constructor() {
        this.gapi = window.gapi;
    }

    async gapiLogin(onlyAlreadySigned: boolean = false): Promise<ResponseLoginGapiType | null> {
        try {
            await new Promise((resolve, reject) => {
                this.gapi.load('client:auth2', resolve);
            });
            await this.gapi.auth2.init({
                client_id: CLIENT_ID_GOOGLE,
                // scope: "https://www.googleapis.com/auth/youtube.readonly",
            });
            const authInstance = this.gapi.auth2.getAuthInstance();
            const isSignedIn = authInstance.isSignedIn.get();
            if (isSignedIn) {
                return authInstance.currentUser.Xd;
            } else if (!onlyAlreadySigned) {
                return await authInstance.signIn();
            }
            return null
        } catch (error: unknown) {
            // console.error(error)
        }
        return null
    };

    async gapiLogout(): Promise<boolean> {
        try {
            const authInstance = this.gapi.auth2.getAuthInstance();
            await authInstance.signOut();
            return true;
        } catch (error: unknown) {
            console.error(error)
            return false;
        }
    };

}

export default new AuthService();




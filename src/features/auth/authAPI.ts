import { CLIENT_ID_GOOGLE } from "../../constantes/config";
import { ResponseLoginGapiType, GapiType } from "./authTypes";
declare global {
    interface Window { gapi: any; }
}

export const { gapi }: { gapi: GapiType } = window;

export const gapiLogin = async (onlyAlreadySigned: boolean = false): Promise<ResponseLoginGapiType | null> => {
    try {
        await new Promise((resolve, reject) => {
            gapi.load('client:auth2', resolve);
        });
        await gapi.auth2.init({
            client_id: CLIENT_ID_GOOGLE,
            // scope: "https://www.googleapis.com/auth/youtube.readonly",
        });
        const authInstance = gapi.auth2.getAuthInstance();
        const isSignedIn = authInstance.isSignedIn.get();
        if (isSignedIn) {
            return authInstance.currentUser.Xd;
        } else if (!onlyAlreadySigned) {
            return await authInstance.signIn();
        }
    } catch (error: unknown) {
        // console.error(error)
    }
    return null
};

export const gapiLogout = async (): Promise<boolean> => {
    try {
        const authInstance = gapi.auth2.getAuthInstance();
        await authInstance.signOut();
        return true;
    } catch (error: unknown) {
        console.error(error)
        return false;
    }
};
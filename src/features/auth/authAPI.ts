import { CLIENT_ID_GOOGLE } from "../../constantes/config";
declare global {
    interface Window { gapi: any; }
}
const { gapi } = window;

export const gapiLogin = async (onlyAlreadySigned: boolean = false): Promise<any> => {
    try {
        await new Promise((resolve, reject) => {
            gapi.load('client:auth2', resolve);
        });
        await window.gapi.auth2.init({
            client_id: CLIENT_ID_GOOGLE,
            // scope: "youtube",
        });
        const authInstance = gapi.auth2.getAuthInstance();
        const isSignedIn = authInstance.isSignedIn.get();
        if (isSignedIn) {
            return authInstance.currentUser.Xd;
        } else if (!onlyAlreadySigned) {
            return await authInstance.signIn();
        }
    } catch (error: unknown) {
        console.error(error)
    }
    return null
};

export const gapiLogout = async (): Promise<any> => {
    try {
        const authInstance = gapi.auth2.getAuthInstance();
        await authInstance.signOut();
        return true;
    } catch (error: unknown) {
        console.error(error)
        return false;
    }
};
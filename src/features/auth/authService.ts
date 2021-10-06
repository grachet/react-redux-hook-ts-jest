import { CLIENT_ID_GOOGLE } from "../../constantes/config";
import {   GapiType, AccountType } from "./authTypes";

declare global {
    interface Window { gapi: any; }
}

class AuthService {

    gapi: GapiType

    constructor() {
        this.gapi = window.gapi;
    }

    async gapiLogin(onlyAlreadySigned: boolean = false): Promise<AccountType | null> {
        try {

            if (!this.gapi?.load) {
                return null
            }

            await new Promise((resolve, reject) => {
                this.gapi.load('client:auth2', resolve);
            });
            await this.gapi.auth2.init({
                client_id: CLIENT_ID_GOOGLE,
                // scope: "https://www.googleapis.com/auth/youtube.readonly",
            });
            const authInstance = this.gapi.auth2.getAuthInstance();
            const isSignedIn = authInstance.isSignedIn.get();

            if (onlyAlreadySigned && !isSignedIn) {
                return null;
            }

            if (!isSignedIn) {
                await authInstance.signIn();  
            }  

            const profile = authInstance.currentUser.get().getBasicProfile();

            return { 
                email:  profile.getEmail(),
                profilePictureURL: profile.getImageUrl(),
                fullName: profile.getName(),
                isAnonymous: false
            } 
        } catch (error: unknown) {
            console.error(error)
        }
        return null
    }; 

    async gapiLogout(): Promise<boolean> {
        try {
            const authInstance = this.gapi.auth2.getAuthInstance();
            const isSignedIn = authInstance.isSignedIn.get();
            if (isSignedIn) {
                await authInstance.signOut();
            } 
            return true;
        } catch (error: unknown) {
            console.error(error)
            return false;
        }
    };

}

export default new AuthService();




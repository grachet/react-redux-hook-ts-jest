export interface AuthState {
    account: null | AccountType;
    status: 'idle' | 'loading' | 'failed';
}

export type AccountType = {
    email: string,
    profilePictureURL: string,
    fullName: string,
    isAnonymous: boolean,
}

export type GapiUserType = { 
    get: () => ({
        getBasicProfile: ()=> ({ 
             getEmail : () => string,
             getImageUrl : () => string,
             getName : () => string, 
        })
    });
}
 
export type AuthInstanceType = {
    currentUser: GapiUserType ,
    isSignedIn: {
        get: () => boolean,
    },
    signIn: () => Promise<GapiUserType>,
    signOut: () => Promise<any>,
}

export type GapiType = {
    load: (type: string, f: (a?: any) => void) => any,
    auth2: {
        init: (args: { [key: string]: string | number }) => Promise<any>,
        getAuthInstance: () => AuthInstanceType,
    }
}

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

export type ResponseLoginGapiType = {
    it: {
        Tt: string,
        kK: string,
        Se: string,
    }
}

export type AuthInstanceType = {
    currentUser: {
        Xd: ResponseLoginGapiType
    },
    isSignedIn: {
        get: () => boolean,
    },
    signIn: () => Promise<ResponseLoginGapiType>,
    signOut: () => Promise<any>,
}

export type GapiType = {
    load: (type: string, f: (a?: any) => void) => any,
    auth2: {
        init: (args: { [key: string]: string | number }) => Promise<any>,
        getAuthInstance: () => AuthInstanceType,
    }
}

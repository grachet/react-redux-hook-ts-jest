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

export interface AuthState {
    account: null | AccountType;
    status: 'idle' | 'loading' | 'failed';
}

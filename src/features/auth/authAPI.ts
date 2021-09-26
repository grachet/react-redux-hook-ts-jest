declare global {
    interface Window { gapi: any; }
}

export const gapiLogin = async (): Promise<any> => {

    return new Promise<{ data: any }>((resolve) =>
        setTimeout(() => resolve({ data: { name: "john" } }), 500)
    );

    // const rep = await window.gapi.load("auth2");
    // console.log(rep)
    // CLIENT_ID_GOOGLE
    // window.gapi.load("auth2", () => {
    //     window.gapi.auth2
    //         .init({
    //             client_id: process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID,
    //             scope: "email",
    //         })
    //         .then(() => {
    //             // create auth variable
    //             this.auth = window.gapi.auth2.getAuthInstance();
    //             // can now use logic of onAuthChange for initial render
    //             this.onAuthChange(this.auth.isSignedIn.get());
    //             // listen for changes to authentication status
    //             this.auth.isSignedIn.listen(this.onAuthChange);
    //         });
    // });
};

export const gapiLogout = async (): Promise<any> => {

};
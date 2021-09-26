const { gapi } = window;

export const getHomeVideos = async (page: number = 0) => {

    try {
        const rep = await gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest");
        const repYoutube = await gapi.client.youtube.channels.list({})
        console.log("rep", rep, gapi, repYoutube)
    } catch (error: unknown) {
        console.error(error)
    }



    return new Promise<{ data: number[] }>((resolve) =>
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }), 500)
    );
};

export const getExploreVideos = async (page: number = 0) => {
    return new Promise<{ data: number[] }>((resolve) =>
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5, 6, 7] }), 500)
    );
};

export const getSubscriptionVideos = async (page: number = 0) => {
    return new Promise<{ data: number[] }>((resolve) =>
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }), 500)
    );
};


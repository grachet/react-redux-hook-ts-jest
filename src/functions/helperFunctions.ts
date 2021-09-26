import { Location } from 'history';
import { VideoKeyType } from '../features/video/videoSlice';

export const locationToVideoType = (location: Location<unknown>): VideoKeyType => {
    const name = location.pathname.substring(1);
    return (name === "home" || name === "explore" || name === "subscription") ? name : "home";
}
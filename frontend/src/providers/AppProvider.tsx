import { useState, useLayoutEffect, useEffect, createContext, useContext } from "react";
import { useInitData } from "@telegram-apps/sdk-react";
import { Howl, Howler } from "howler";

import API from "@/libs/API";

type Volume = "on" | "off";

interface AppContextData {
    volume: Volume;
    toggleMusic: () => void;
}

const AppContext = createContext<AppContextData | null>(null);

const AppProvider = ({ children }: { children: JSX.Element }) => {

    const initData = useInitData();
    const [volume, setVolume] = useState<Volume>(localStorage.getItem('volume') === "off" ? "off" : "on");

    useEffect(() => {
        let isMute = volume === "off";
        Howler.mute(isMute);
        localStorage.setItem('volume', volume);
        localStorage.setItem('whac-muted', volume === "on" ? "false" : "true");
    }, [volume])

    const toggleMusic = () => {
        setVolume(prev => prev === "on" ? "off" : "on");
    }

    useLayoutEffect(() => {
        API.post('/auth/login', {
            userid: initData?.user?.id,
            username: initData?.user?.username,
            firstname: initData?.user?.firstName,
            lastname: initData?.user?.lastName,
            is_premium: initData?.user?.isPremium,
            inviter: initData?.startParam,
        }).then((res) => {
            localStorage.setItem('token', `Bearer ${res.data.token}`);
            console.log('User logined:', initData?.user?.username, initData?.user?.firstName, initData?.user?.lastName);
        })
        .catch(console.error);

        const audio = new Howl({
            src: ['/mp3/background.mp3'],
            autoplay: true,
            loop: true,
            preload: true,
            volume: 0.3
        });

        audio.play();

        const handleVisibilityChange = () => {
            Howler.mute(document.hidden);
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            audio.unload();
        }
    }, []);

    return (
        <AppContext.Provider value={{ toggleMusic, volume }}>
            {  children }
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext);
export default AppProvider;
import { Chat } from "./components/Chat";
import { VideoGrid } from "./components/VideoGrid";
import { Options } from "./components/Options";
import { Notification } from "./components/Notification";

export const App = () => {
    return (
        <div className="flex flex-row w-screen h-screen bg-gradient-to-r from-[#0b0b0b] to-[#282828] text-white">
            <div className="flex flex-col justify-between items-center w-3/4 pt-16">
                <div className="text-center text-6xl">Video Chat App</div>
                <VideoGrid />
                <Options />
                <Notification />
            </div>
            <div className="w-1/4">
                <Chat />
            </div>
        </div>
    )
};
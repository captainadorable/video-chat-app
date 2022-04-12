import { useContext, useEffect } from 'react';
import { SocketContext } from '../Context';

export const VideoGrid = () => {
    const { myVideoRef, callAccepted, callEnded, call, userVideoRef, name } = useContext(SocketContext);

    useEffect(() => {
        console.log('USER VİDEO REFERENCE', userVideoRef)
    }, [userVideoRef]);

    return (
        <div className="flex flex-row space-x-8 justify-center w-5/6 pt-32">
            <div className="flex flex-col items-center space-y-2">
                <div className="h-8">{name}</div>
                <video
                    playsInline
                    muted
                    ref={myVideoRef}
                    autoPlay
                    width="400"
                    className="border-2 border-black rounded-2xl"
                ></video>
            </div>
            <div className={`items-center space-y-2 ${callAccepted && !callEnded ? "flex flex-col": "hidden"}`}>
                <div className="h-8">{call.name}</div>
                <video
                    playsInline
                    ref={userVideoRef}
                    autoPlay
                    width="400"
                    className="border-2 border-black rounded-2xl"
                ></video>
            </div>
        </div>
    );
};

import { useContext, useEffect } from 'react';
import { SocketContext } from '../Context';

export const Options = () => {
    const { me, setName, callAccepted, callEnded, callUser, leaveCall } = useContext(SocketContext);

    const NameChangeHandler = (event) => {
        event.preventDefault();
        const name = event.target.value;
        setName(name);
    };

    const CallUserHandler = (event) => {
        event.preventDefault();
        const callId = event.target.elements.userid.value;

        if (!callId) return;
        
        callUser(callId);
    };

    const CopyClipboardHandler = (event) => {
        return
    };

    if (callAccepted && !callEnded) {
        return (
            <div className="flex flex-row justify-center items-center w-2/3 h-1/2">
                <button className="bg-red-700 w-1/4 h-1/6 rounded-lg" onClick={leaveCall}>Hang up</button>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-row justify-between w-2/3 h-1/2 pt-24">
                <div className="flex flex-col space-y-4 text-black w-1/4">
                    <div className="text-center text-white text-2xl">Account Info</div>
                    <input
                        name="getname"
                        className="p-2"
                        type="text"
                        placeholder="Enter your name"
                        onChange={NameChangeHandler}
                    />
                    <input className="p-2" type="text" readonly value={me} />
                    <button className="bg-blue-600 text-white h-1/5 rounded-lg" onClick={CopyClipboardHandler}>
                        Copy to clipboard
                    </button>
                </div>
                <form className="flex flex-col space-y-4 text-black w-1/4" onSubmit={CallUserHandler}>
                    <div className="text-center text-white text-2xl">Call a user</div>
                    <input className="p-2" type="text" placeholder="Enter ID" name="userid" />
                    <button className="bg-green-600 text-white h-1/5 rounded-lg">Call</button>
                </form>
            </div>
        );
    }
};

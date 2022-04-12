import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:3001');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [me, setMe] = useState(''); // My socket id
    const [name, setName] = useState('');
    const [user, setUser] = useState({});
    const [stream, setStream] = useState(); // My stream
    const [call, setCall] = useState({}); // Call props

    const myVideoRef = useRef();
    const userVideoRef = useRef(); // Video of the other user
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentstream) => {
            setStream(currentstream);

            myVideoRef.current.srcObject = currentstream;
            console.log("My stream", currentstream)
        });

        socket.on('me', (id) => setMe(id)); // Set my socket id

        socket.on('callUser', ({ callFrom, callFromName: callerName, signal }) => {
            setCall({ isReceivingCall: true, from: callFrom, name: callerName, signal: signal }); // Set the call object to incoming call props
            setUser({ id: callFrom, name: callerName })
        });
    }, []); // Call once

    const answerCall = () => {
        setCallAccepted(true); // Accept call

        const peer = new Peer({ initiator: false, trickle: false, stream }); // Inıtator false becaue i am answering the call , discable trickle (idk what it is), pass my stream data

        peer.on('signal', (data) => {
            // Listen signal, get data and send signal to other user
            socket.emit('answerCall', { signal: data, to: call.from, from: me, fromName: name });
        });

        peer.on('stream', (currentStream) => {
            // Set other user's video data
            userVideoRef.current.srcObject = currentStream;
            console.log("My video ref", myVideoRef)
            console.log("Stream on", userVideoRef)
        });

        peer.signal(call.signal);

        socket.on("call ended", () => {
            setCallEnded(true)
        })

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream }); // Initator true because i am calling, disable trickle, pass my stream data

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, callFrom: me, callFromName: name }); // emit callUser event to server with userToCall id, signal data, my id, my name
            console.log("Calling user: ", id, me, name, data)
        });

        peer.on('stream', (currentStream) => {
            // Wait for stream signal get data and set other user's video
            userVideoRef.current.srcObject = currentStream;
            console.log("My video ref", myVideoRef)
            console.log("Stream on", userVideoRef)
        });

        socket.on('callAccepted', ({signal, from, fromName}) => {
            // When call accepted set call accepted to true and send signal to other peer
            setCallAccepted(true);

            peer.signal(signal);

            setUser({ id: from, name: fromName })
            console.log("Call Accepted, Signal: ", signal)
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true); //Set call ended true

        connectionRef.current.destroy(); //Destroy the connection object

        window.location.reload(); //Refresh page
    };

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                myVideoRef,
                userVideoRef,
                stream,
                name,
                setName,
                callEnded,
                me,
                callUser,
                leaveCall,
                answerCall
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };

import { useContext } from 'react';
import { SocketContext } from '../Context';

export const Notification = () => {
    const { call, answerCall, callAccepted } = useContext(SocketContext);

    return (
        <>
          {call.isReceivingCall && !callAccepted ? (<div className='flex flex-row justify-center w-1/2 space-x-8 pb-4'>
              <div>{call.name} is calling.</div>
              <button className='bg-green-600 w-1/4' onClick={answerCall}>Answer</button>
          </div>) : (<></>)}  
        </>
    )
};
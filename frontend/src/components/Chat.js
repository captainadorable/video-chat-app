export const Chat = () => {
    return (
        <div className="flex flex-col h-full space-y-12 py-24 px-8 bg-[#0c0c0c]">
            <div className="text-4xl self-center">Chat</div>
            <form className="flex flex-col justify-between space-y-8 h-full">
                <div className="w-full h-full p-4 self-center overflow-auto flex flex-col space-y-4 bg-[#111111]">
                    <div className="flex flex-row space-x-2">
                        <div>[User]: </div>
                        <div>Message from me! ZORTT!</div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <div>[User2]: </div>
                        <div>AAA!</div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <input className="border-2 w-full p-2 text-black" name="message" type="text" placeholder="Enter a message!" />
                    <button className="bg-blue-600 p-2 w-1/2 self-center rounded-lg hover:bg-blue-500">Send message</button>
                </div>
            </form>
        </div>
    )
};
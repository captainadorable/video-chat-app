const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.use(cors());

io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    socket.on('callUser', ({ userToCall, callFrom, callFromName, signalData }) => {
        io.to(userToCall).emit('callUser', { signal: signalData, callFrom, callFromName });
    });

    socket.on('answerCall', ({signal, to, from, fromName}) => {
        io.to(to).emit('callAccepted', {signal, from, fromName});
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log('Listening port ' + PORT);
});

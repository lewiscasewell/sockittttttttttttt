import { WebSocket } from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

let count = 0;

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const msg = message.toString();
        console.log(`Received message: ${msg}`);
        count = Number.parseInt(msg, 10);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    setInterval(() => {
        ws.send(`Hello Client! Your count at ${Date.now()} is count ${count}`);
    }, 5000);
});



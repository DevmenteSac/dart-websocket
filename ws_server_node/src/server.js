// src/server.js
const WebSocket = require('ws');
const { handleConnection } = require('./connectionHandler');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => handleConnection(ws, req, wss));

console.log('Servidor WebSocket escuchando en ws://localhost:8080');

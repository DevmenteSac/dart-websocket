// src/server.js

// todo lo que esta en src es del server pero mas estructurado

const WebSocket = require('ws');
const { handleConnection } = require('./connectionHandler');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => handleConnection(ws, req, wss));

console.log('Servidor WebSocket escuchando en ws://localhost:8080');

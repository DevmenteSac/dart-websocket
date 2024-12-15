// src/messageHandler.js
const WebSocket = require('ws');
const { getClientIp } = require('./utils');

function handleMessages(ws, req, ip, wss) {
    ws.on('message', function incoming(message) {
        console.log('Mensaje recibido: %s', message);

        // Enviar el mensaje a todos los clientes, excluyendo al cliente que lo envía
        // broadcastMessage(ws, message, ip, wss, false);

        // O enviar el mensaje a todos los clientes, incluyendo al cliente que lo envía
        // broadcastMessage(ws, message, ip, wss, true);

        // Responder al cliente que envió el mensaje
        ws.send(`Servidor: Recibí tu mensaje - "${message}"`);
    });
}

function broadcastMessage(ws, message, ip, wss, includeSender) {
    // Recorrer todos los clientes conectados
    wss.clients.forEach(client => {
        // Enviar mensaje a los clientes conectados según la opción `includeSender`
        if (client.readyState === WebSocket.OPEN) {
            if (includeSender || client !== ws) {
                client.send(`Mensaje de ${ip}: ${message}`);
            }
        }
    });
}

module.exports = { handleMessages };

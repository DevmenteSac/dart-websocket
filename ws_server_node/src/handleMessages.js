// src/messageHandler.js
const WebSocket = require('ws');
const { getClientIp } = require('./utils');

// Muy importante las importaciones
const MessageHandler = require('./transport/MessageHandler');
const MessageType = require('./transport/MessageType');
const Message = require('./transport/Message');

function handleMessages(ws, req, ip, wss) {
    const messageHandler = new MessageHandler();

    ws.on('message', function incoming(message) {
        // console.log('Mensaje recibido: %s', message);

        // Para recibir mensajes con type
        const decodedMessage = messageHandler.decodeMessageJson(message);
        const type = decodedMessage.type;
        const object = decodedMessage.object;

        console.log("Mensaje decodificado:", decodedMessage);

        switch (type) {
            case MessageType.CHAT:
                // Si el objeto es de tipo Message, lo deserializamos
                const msg = Message.fromJson(object);
                console.log("Mensaje chat recibido:", msg.mensaje);
                console.log("Mensaje de:", msg.usuario);
                break;

            case MessageType.JOIN:
                // Procesar el mensaje de tipo "join"
                console.log("Mensaje join, entraste");
                break;

            default:
                console.log("Tipo de mensaje desconocido");
        }

        // Enviar el mensaje a todos los clientes, excluyendo al cliente que lo envía
        // broadcastMessage(ws, message, ip, wss, false);

        // O enviar el mensaje a todos los clientes, incluyendo al cliente que lo envía
        // broadcastMessage(ws, message, ip, wss, true);

        // Responder al cliente que envió el mensaje
        // ws.send(`Servidor: Recibí tu mensaje - "${message}"`);
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

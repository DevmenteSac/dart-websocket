// src/connectionHandler.js
const { getClientIp } = require('./utils');
const { handleMessages } = require('./handleMessages');

// Muy importante las importaciones
const MessageHandler = require('./transport/MessageHandler');
const MessageType = require('./transport/MessageType');
const Message = require('./transport/Message');

function handleConnection(ws, req, wss) {
    const messageHandler = new MessageHandler();

    const ip = getClientIp(req);
    console.log('Nuevo cliente conectado desde IP:', ip);

    // Para enviar mensajes con type
    const message = new Message("Usuario Entrando", "Bienvenido al servidor WebSocket");
    const encodeMessage = messageHandler.encodeMessageJson(MessageType.ALERT, message);
    ws.send(encodeMessage);

    // Pasar el servidor WebSocket a la función handleMessages
    handleMessages(ws, req, ip, wss);

    // Manejar errores en la conexión WebSocket
    ws.on('error', (error) => {
        console.error('Error en la conexión WebSocket:', error);
    });

    // Manejar la apertura de la conexión
    // ws.on('open', function open() {
    //     ws.send('something');
    // });

    // Manejar la desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado:', ip);
    });
}

module.exports = { handleConnection };

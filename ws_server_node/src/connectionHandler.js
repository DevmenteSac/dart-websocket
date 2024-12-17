// src/connectionHandler.js
const { getClientIp } = require('./utils');
const { handleMessages } = require('./handleMessages');

function handleConnection(ws, req, wss) {
    const ip = getClientIp(req);
    console.log('Nuevo cliente conectado desde IP:', ip);

    ws.send('Bienvenido al servidor WebSocket');

    // Pasar el servidor WebSocket a la función handleMessages
    handleMessages(ws, req, ip, wss);

    // Manejar errores en la conexión WebSocket
    ws.on('error', (error) => {
        console.error('Error en la conexión WebSocket:', error);
    });

    // Manejar la apertura de la conexión
    ws.on('open', function open() {
        ws.send('something');
    });

    // Manejar la desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado:', ip);
    });
}

module.exports = { handleConnection };

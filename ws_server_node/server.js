// ws: Se refiere a la conexión individual de un cliente específico al servidor.
// Importamos la librería ws para trabajar con WebSockets

// Para recibir mensajes se usa ws.on('message', function incoming(message) {
// Para enviar mensjaes se usa ws.send()
const WebSocket = require('ws');

// Creamos un servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
    // Obtener la dirección IP del cliente
    const ip = req.socket.remoteAddress;
    console.log('Nuevo cliente conectado desde IP:', ip);

    ws.send('Bienvenido al servidor WebSocket');

    // Escuchamos los mensajes del cliente, evento message, cuando el cliente manda mensajes
    ws.on('message', function incoming(message) {
        console.log('Mensaje recibido: %s', message);


        // Para enviar el mensaje a todos los clientes excluyendo al cliente que lo envia
        // wss.clients.forEach(function each(client) {

        //     if (client !== ws && client.readyState === WebSocket.OPEN) {

        //         client.send(`Mensaje de ${ip}: ${message}`);
        //     }

        // });


        // Para enviar el mensaje a todos los clientes incluyendo al cliente que lo envia
        // wss.clients.forEach(function each(client) {

        //     if (client.readyState === WebSocket.OPEN) {

        //         client.send(`Mensaje de ${ip}: ${message}`);

        //     }

        // });


        ws.send(`Servidor: Recibí tu mensaje - "${message}"`);
    });

    // Manejar errores, evento error
    ws.on('error', (error) => {
        console.error('Error en la conexión WebSocket:', error);
    });

    // Manejar la conexion
    ws.on('open', function open() {
        ws.send('something');
    });

    // Manejar la desconexión, evento close, cuando se cierra la conexion con un cliente
    ws.on('close', () => {
        console.log('Cliente desconectado:', ip);
    });

});

console.log('Servidor WebSocket escuchando en ws://localhost:8080');
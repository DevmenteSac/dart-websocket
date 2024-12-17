// ws: Se refiere a la conexión individual de un cliente específico al servidor.
// Importamos la librería ws para trabajar con WebSockets


// Para recibir mensajes se usa ws.on('message', function incoming(message) {
// Para enviar mensjaes se usa ws.send()
const WebSocket = require('ws');


// Creamos un servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

const MessageHandler = require('./src/transport/MessageHandler');
const MessageType = require('./src/transport/MessageType');
const Message = require('./src/transport/Message');

wss.on('connection', function connection(ws, req) {
    // para enviar/recibir types y messages
    const messageHandler = new MessageHandler();

    // Obtener la dirección IP del cliente
    const ip = req.socket.remoteAddress;
    console.log('Nuevo cliente conectado desde IP:', ip);

    const message = new Message("Usuario Entrando", "Bienvenido al servidor WebSocket");
    const encodeMessage = messageHandler.encodeMessageJson(MessageType.ALERT, message);
    ws.send(encodeMessage);

    const message2 = new Message("Usuario Chat", "Bienvenido al Chat");
    const encodeMessage2 = messageHandler.encodeMessageJson(MessageType.CHAT, message2);
    ws.send(encodeMessage2);

    // Escuchamos los mensajes del cliente, evento message, cuando el cliente manda mensajes
    ws.on('message', function incoming(message) {
        // console.log('Mensaje recibido: %s', message);

        const decodedMessage = messageHandler.decodeMessageJson(message);
        const type = decodedMessage.type;
        const object = decodedMessage.object;

        console.log("Mensaje decodificado:", decodedMessage);

        // Procesar según el tipo de mensaje
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

        // ws.send(`Servidor: Recibí tu mensaje - "${message}"`);
    });


    // Manejar errores, evento error
    ws.on('error', (error) => {
        console.error('Error en la conexión WebSocket:', error);
    });


    // Manejar la conexion
    ws.on('open', function open() {
        const message = new Message("Usuario Default", "evento open");
        const encodeMessage = messageHandler.encodeMessageJson(MessageType.ALERT, message);
        ws.send(encodeMessage);
    });


    // Manejar la desconexión, evento close, cuando se cierra la conexion con un cliente
    ws.on('close', () => {
        console.log('Cliente desconectado:', ip);
    });


});


console.log('Servidor WebSocket escuchando en ws://localhost:8080');


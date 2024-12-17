const MessageType = require('./MessageType');

class MessageHandler {
    // Método para crear un mensaje JSON, Para enviar
    encodeMessageJson(type, object) {
        return JSON.stringify({
            type: type,
            object: typeof object === 'string' ? object : object.toJson()
        });
    }

    // Método para manejar un mensaje JSON, Para recibir
    decodeMessageJson(message) {
        // Paso 1: Convertir el mensaje JSON en un objeto
        const jsonData = JSON.parse(message);

        // Paso 2: Leer el tipo de mensaje
        const typeString = jsonData.type;
        const type = Object.values(MessageType).includes(typeString)
            ? typeString
            : MessageType.UNKNOW;

        // Paso 3: Leer el objeto
        const object = jsonData.object;

        // Retornar el tipo y el objeto
        return {
            type: type,
            object: object
        };
    }
}

module.exports = MessageHandler;
